import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { BaseRepository } from '@/common/repositories/base.repository';

let ORDER_ENTITIES = [];

@Injectable()
export class OrdersRepository extends BaseRepository<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly model: Repository<OrderEntity>,
  ) {
    super(model);
  }

  create(orderModel: any): any {
    const orderEntity = {
      id: Math.floor(Math.random() * 1000000),
      ...orderModel,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    ORDER_ENTITIES.push({ ...orderEntity });
    return orderEntity;
  }

  all(): any {
    return ORDER_ENTITIES;
  }

  findById(id: number): any {
    return ORDER_ENTITIES.find((order) => order.id === id);
  }

  update(id: number, newOrderModel: any): any {
    const orderEntity = this.findById(id);
    if (!orderEntity) {
      throw new Error('Order not found');
    }

    const { orderItems, ...newOrderEntity } = newOrderModel;
    const newOrderItems = orderItems;
    ORDER_ENTITIES[id] = { ...orderEntity, ...newOrderEntity };
    ORDER_ENTITIES[id].orderItems = newOrderItems;
    return ORDER_ENTITIES[id];
  }

  remove(id: number): any {
    const orderEntity = this.findById(id);
    if (!orderEntity) {
      throw new Error('Order not found');
    }
    ORDER_ENTITIES = ORDER_ENTITIES.filter((order) => order.id !== id);
    return orderEntity;
  }
}
