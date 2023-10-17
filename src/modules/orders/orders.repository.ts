import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderModel } from './models/order.model';
import { orderEntityToModel } from './mappers/order.mapper';
import { OrderNotFoundException } from '@/common/exceptions';

let ORDER_ENTITIES = [];

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly model: Repository<OrderEntity>,
  ) {}

  async create(orderModel: OrderModel): Promise<OrderModel> {
    ORDER_ENTITIES.push({
      id: orderModel.id,
      customer_id: orderModel.customer_id,
      payment_method: orderModel.payment.method,
      payment_amount: orderModel.payment.amount,
      paid_at: orderModel.payment.paidAt,
      courier_name: orderModel.shipping.courierName,
      invoice_number: orderModel.shipping.invoiceNumber,
      shipping_address: orderModel.shipping.address,
      shipping_receiver: orderModel.shipping.receiver,
      shipping_receiver_phone: orderModel.shipping.receiverPhone,
      departed_at: orderModel.shipping.departedAt,
      arrived_at: orderModel.shipping.arrivedAt,
      canceled_at: orderModel.canceled_at,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
    return orderEntityToModel(ORDER_ENTITIES[ORDER_ENTITIES.length - 1]);
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
      canceled_at: newOrderModel.canceled_at,
      updated_at: new Date(),
    };
    ORDER_ENTITIES = ORDER_ENTITIES.map((order) =>
      order.id === id ? newOrderEntity : order,
    );
    return orderEntityToModel(newOrderEntity);
  }

  async remove(id: number): Promise<OrderModel> {
    const orderEntity = ORDER_ENTITIES.find((order) => order.id === id);
    if (!orderEntity) {
      throw new Error('Order not found');
    }
    ORDER_ENTITIES = ORDER_ENTITIES.filter((order) => order.id !== id);
    return orderEntityToModel(orderEntity);
  }
}
