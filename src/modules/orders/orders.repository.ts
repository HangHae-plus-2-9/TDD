import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderModel } from './models/order.model';
import { cloneDeep } from 'lodash';
import { orderEntityToModel } from './mappers/order.mapper';

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
      paid_at: orderModel.payment.paid_at,
      courier_name: orderModel.shipping.courier_name,
      invoice_number: orderModel.shipping.invoice_number,
      shipping_address: orderModel.shipping.address,
      shipping_receiver: orderModel.shipping.receiver,
      shipping_receiver_phone: orderModel.shipping.receiver_phone,
      departed_at: orderModel.shipping.departed_at,
      arrived_at: orderModel.shipping.arrived_at,
      canceled_at: orderModel.canceled_at,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
    return orderModel;
    // const orderEntity = {
    //   id: Math.floor(Math.random() * 1000000),
    //   ...orderModel,
    //   created_at: new Date(),
    //   updated_at: new Date(),
    //   deleted_at: null,
    // };
    // ORDER_ENTITIES.push({ ...orderEntity });
    // return orderEntity;
  }

  async all(): Promise<OrderModel[]> {
    return ORDER_ENTITIES.map((entity) => orderEntityToModel(entity));
  }

  async findById(id: number): Promise<OrderModel> {
    return orderEntityToModel(ORDER_ENTITIES.find((order) => order.id === id));
  }

  async update(id: number, newOrderModel: any): Promise<OrderModel> {
    const orderEntity = ORDER_ENTITIES.find((order) => order.id === id);
    if (!orderEntity) {
      throw new Error('Order not found');
    }

    const { orderItems, ...newOrderEntity } = newOrderModel;
    const newOrderItems = orderItems;
    ORDER_ENTITIES[id] = { ...orderEntity, ...newOrderEntity };
    ORDER_ENTITIES[id].orderItems = newOrderItems;
    return orderEntityToModel(ORDER_ENTITIES[id]);
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
