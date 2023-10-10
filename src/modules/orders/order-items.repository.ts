import { BaseRepository } from '@/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { OrderItemEntity } from './entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const ORDER_ITEM_ENTITIES = [];

@Injectable()
export class OrderItemsRepository extends BaseRepository<OrderItemEntity> {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly model: Repository<OrderItemEntity>,
  ) {
    super(model);
  }

  async createManyWithOrderId(
    orderId: number,
    orderItemModels: any[],
  ): Promise<any[]> {
    return await orderItemModels.map((item) => {
      const orderItemEntity = {
        id: Math.floor(Math.random() * 1000000),
        order_id: orderId,
        ...item,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      ORDER_ITEM_ENTITIES.push({ ...orderItemEntity });
      return orderItemEntity;
    });
  }

  async findByOrderId(orderId: number): Promise<any[]> {
    return ORDER_ITEM_ENTITIES.filter((item) => item.order_id === orderId);
  }

  async removeByOrderId(orderId: number): Promise<void> {
    ORDER_ITEM_ENTITIES.filter((item) => item.order_id !== orderId);
  }
}
