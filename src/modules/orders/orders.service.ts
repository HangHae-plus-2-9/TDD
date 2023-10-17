import { Injectable, Logger } from '@nestjs/common';
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
import { ProductNotFoundException } from '@/common/exceptions';

@Injectable()
export class OrdersService {
  constructor(
    private readonly logger: Logger,
    private readonly productsService: ProductsService,
    private readonly orderRepo: OrdersRepository,
    private readonly orderItemRepo: OrderItemsRepository,
  ) {}

  async create(
    customerId: number,
    paymentInfo: CreatePaymentDto,
    shippingInfo: CreateShippingDto,
    orderItems: CreateOrderItemDto[],
  ) {
    const orderId = createNumericId();

    const orderItemModels = await this.orderItemRepo.createManyWithOrderId(
      orderId,
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
            order_id: orderId,
            product_id: item.productId,
            quantity: item.quantity,
            price: productModel.price,
          } as OrderItemModel;
        }),
      ),
    );

    const orderModel = await this.orderRepo.create({
      id: orderId,
      customer_id: customerId,
      payment: {
        method: paymentInfo.method,
        amount: orderItemModels.reduce(
          (acc, cur) => acc + cur.price * cur.quantity,
          0,
        ),
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
      canceled_at: null,
    } as OrderModel);

    return { ...orderModel, order_items: orderItemModels };
  }

  async findAll() {
    const orderModels = await this.orderRepo.all();
    const orders = await Promise.all(
      orderModels.map(async (orderModel) => {
        const orderItemModels = await this.orderItemRepo.getByOrderId(
          orderModel.id,
        );
        return { ...orderModel, order_items: orderItemModels };
      }),
    );
    return orders;
  }

  async findOne(id: number) {
    const orderModel = await this.orderRepo.getByOrderId(id);
    const orderItemModels = await this.orderItemRepo.getByOrderId(id);
    return { ...orderModel, order_items: orderItemModels };
  }

  async update(
    id: number,
    paymentInfo: CreatePaymentDto,
    shippingInfo: CreateShippingDto,
    orderItems: CreateOrderItemDto[],
  ) {
    const updatedOrderItemModels =
      await this.orderItemRepo.updateManyWithOrderId(
        id,
        await Promise.all(
          orderItems.map(async (item) => {
            const productInfo = await this.productsService.findOne(
              item.productId,
            );
            return {
              order_id: id,
              product_id: item.productId,
              quantity: item.quantity,
              price: productInfo.price,
            } as OrderItemModel;
          }),
        ),
      );
    // TODO: Product quantity update
    const newOrderModel = await this.orderRepo.getByOrderId(id);
    _.merge(
      newOrderModel,
      {
        payment: {
          ...paymentInfo,
          amount: updatedOrderItemModels.reduce(
            (acc, cur) => acc + cur.price * cur.quantity,
            0,
          ),
        },
      },
      { shipping: shippingInfo },
    );
    const updatedOrderModel = await this.orderRepo.update(id, newOrderModel);
    return { ...updatedOrderModel, order_items: updatedOrderItemModels };
  }

  async remove(id: number) {
    // const order = this.findOne(id);
    // if (!order) {
    //   throw new OrderNotFoundException();
    // }
    // this.orderItemRepo.removeByOrderId(id);
    // return this.orderRepo.remove(id);
  }
}
