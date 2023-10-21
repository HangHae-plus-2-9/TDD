import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderModel } from './models/order.model';
import { orderEntityToModel, orderModelToEntity } from './mappers/order.mapper';
import { OrderNotFoundException } from '@/common/exceptions';
import { COURIER_LIST, PAYMENT_METHOD } from '@/common/resources';

let ORDER_ENTITIES: OrderEntity[] = [
  {
    id: 1,
    customer_id: 1,
    payment_method: PAYMENT_METHOD.CREDIT_CARD,
    payment_amount: 10000,
    paid_at: new Date(),
    courier_name: COURIER_LIST.CJ,
    invoice_number: '123456789',
    shipping_address: '경기도 부천시',
    shipping_receiver: '가나다',
    shipping_receiver_phone: '010-1234-5678',
    departed_at: new Date(),
    arrived_at: new Date(),
    canceled_at: null,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  } as OrderEntity,
  {
    id: 2,
    customer_id: 1,
    payment_method: PAYMENT_METHOD.CREDIT_CARD,
    payment_amount: 10000,
    paid_at: new Date(),
    courier_name: COURIER_LIST.HANJIN,
    invoice_number: '123456789',
    shipping_address: '경기도 구리시',
    shipping_receiver: '라마바',
    shipping_receiver_phone: '010-1111-2222',
    departed_at: new Date(),
    arrived_at: null,
    canceled_at: null,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  } as OrderEntity,
];

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly model: Repository<OrderEntity>,
  ) {}

  async create(orderModel: OrderModel): Promise<OrderModel> {
    const orderEntity = OrderEntity.create(orderModelToEntity(orderModel));
    return orderEntityToModel(await orderEntity.save());
  }

  async all(): Promise<OrderModel[]> {
    return ORDER_ENTITIES.map((entity) => orderEntityToModel(entity));
  }

  async getByOrderId(id: number): Promise<OrderModel> {
    const orderEntity = ORDER_ENTITIES.find((order) => order.id === id);
    if (!orderEntity) {
      throw new OrderNotFoundException();
    }
    return orderEntityToModel(orderEntity);
  }

  async update(id: number, newOrderModel: OrderModel): Promise<OrderModel> {
    const orderEntity = ORDER_ENTITIES.find((order) => order.id === id);
    if (!orderEntity) {
      throw new Error('Order not found');
    }

    const newOrderEntity = {
      ...orderEntity,
      payment_method: newOrderModel.payment.method,
      payment_amount: newOrderModel.payment.amount,
      paid_at: newOrderModel.payment.paidAt,
      courier_name: newOrderModel.shipping.courierName,
      invoice_number: newOrderModel.shipping.invoiceNumber,
      shipping_address: newOrderModel.shipping.address,
      shipping_receiver: newOrderModel.shipping.receiver,
      shipping_receiver_phone: newOrderModel.shipping.receiverPhone,
      departed_at: newOrderModel.shipping.departedAt,
      arrived_at: newOrderModel.shipping.arrivedAt,
      canceled_at: newOrderModel.canceledAt,
      updated_at: new Date(),
    } as OrderEntity;
    ORDER_ENTITIES = ORDER_ENTITIES.map((order) =>
      order.id === id ? newOrderEntity : order,
    ) as OrderEntity[];
    return orderEntityToModel(newOrderEntity);
  }

  async removeByOrderId(id: number): Promise<OrderModel> {
    const orderEntity = ORDER_ENTITIES.find((order) => order.id === id);
    if (!orderEntity) {
      throw new Error('Order not found');
    }
    ORDER_ENTITIES = ORDER_ENTITIES.filter((order) => order.id !== id);
    return orderEntityToModel(orderEntity);
  }
}
