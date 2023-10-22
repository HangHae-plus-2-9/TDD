import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrderItemsRepository } from './order-items.repository';
import { OrderModel } from './models/order.model';
import { OrderItemModel } from './models/order-item.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { createNumericId } from '@/common/utils';
import * as _ from 'lodash';
import { ProductsService } from '../products/products.service';
import {
  OrderNotFoundException,
  ProductNotFoundException,
} from '@/common/exceptions';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OrdersService {
  constructor(
    private readonly cLogger: WinstonContextLogger,
    private readonly productsService: ProductsService,
    private readonly orderRepo: OrdersRepository,
    private readonly orderItemRepo: OrderItemsRepository,
  ) {}

  @Transactional()
  async create(
    customerId: number,
    paymentInfo: CreatePaymentDto,
    shippingInfo: CreateShippingDto,
    orderItems: CreateOrderItemDto[],
  ) {
    const orderId = createNumericId();

    if (orderItems.length === 0) throw new Error('Order items must be exist');
    const orderModel = await this.orderRepo.create({
      id: orderId,
      customerId: customerId,
      payment: {
        method: paymentInfo.method,
        amount: 0,
        paidAt: null,
        canceledAt: null,
      },
      shipping: {
        courierName: null,
        invoiceNumber: null,
        address: shippingInfo.address,
        receiver: shippingInfo.receiver,
        receiverPhone: shippingInfo.receiverPhone,
        departedAt: null,
        arrivedAt: null,
        canceledAt: null,
      },
      canceledAt: null,
    } as OrderModel);

    const orderItemModels = await this.orderItemRepo.createManyWithOrderId(
      orderModel.id,
      await Promise.all(
        orderItems.map(async (item) => {
          const productModel = await this.productsService.findOne(
            item.productId,
          );
          if (!productModel) throw new ProductNotFoundException();
          if (item.quantity <= 0)
            throw new Error('Quantity must be greater than 0');
          if (productModel.stock < item.quantity)
            throw new Error('Quantity must be less than product quantity');
          this.productsService.subStock(item.productId, item.quantity);
          return {
            id: createNumericId(),
            orderId: orderModel.id,
            productId: item.productId,
            quantity: item.quantity,
            price: productModel.price,
          } as OrderItemModel;
        }),
      ),
    );

    const amount = orderItemModels.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0,
    );
    await this.orderRepo.update(orderModel.id, {
      ...orderModel,
      payment: { ...orderModel.payment, amount },
    } as OrderModel);

    return { ...orderModel, orderItems: orderItemModels };
  }

  async findAll() {
    this.cLogger.log('Context Logger');
    const orderModels = await this.orderRepo.all();
    const orders = await Promise.all(
      orderModels.map(async (orderModel) => {
        const orderItemModels = await this.orderItemRepo.getByOrderId(
          orderModel.id,
        );
        return { ...orderModel, orderItems: orderItemModels };
      }),
    );
    return orders;
  }

  async findOne(id: number) {
    const orderModel = await this.orderRepo.getByOrderId(id);
    const orderItemModels = await this.orderItemRepo.getByOrderId(id);
    return { ...orderModel, orderItems: orderItemModels };
  }

  @Transactional()
  async update(
    id: number,
    paymentInfo: UpdatePaymentDto,
    shippingInfo: UpdateShippingDto,
    orderItems: UpdateOrderItemDto[],
  ) {
    const orderItemModels = await this.orderItemRepo.getByOrderId(id);
    const updatedOrderItemModels =
      await this.orderItemRepo.updateManyWithOrderId(
        id,
        await Promise.all(
          orderItems.map(async (item) => {
            const productModel = await this.productsService.findOne(
              item.productId,
            );
            if (!productModel) throw new ProductNotFoundException();
            if (productModel.stock < item.quantity)
              throw new Error('Quantity must be less than product quantity');
            return {
              orderId: id,
              productId: item.productId,
              quantity: item.quantity,
              price: productModel.price,
            } as OrderItemModel;
          }),
        ),
      );

    // update product stock
    orderItemModels.forEach((item) => {
      const orderItemModel = updatedOrderItemModels.find(
        (orderItem) => orderItem.productId === item.productId,
      );
      if (!orderItemModel)
        this.productsService.addStock(item.productId, item.quantity);
      else if (orderItemModel.quantity !== item.quantity)
        this.productsService.addStock(
          item.productId,
          item.quantity - orderItemModel.quantity,
        );
    });

    const amount = updatedOrderItemModels.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0,
    );
    console.log('amount', amount);
    const newOrderModel = await this.orderRepo.getByOrderId(id);
    _.merge(
      newOrderModel,
      {
        payment: {
          ...paymentInfo,
          amount,
        },
      },
      { shipping: shippingInfo },
    );
    const updatedOrderModel = await this.orderRepo.update(id, newOrderModel);
    return { ...updatedOrderModel, orderItems: updatedOrderItemModels };
  }

  @Transactional()
  async remove(id: number) {
    const orderModel = await this.orderRepo.getByOrderId(id);
    if (!orderModel) throw new OrderNotFoundException();
    const orderItemModels = await this.orderItemRepo.getByOrderId(id);
    await this.orderItemRepo.removeByOrderId(id);
    await this.orderRepo.removeByOrderId(id);
    return { ...orderModel, orderItems: orderItemModels };
  }
}
