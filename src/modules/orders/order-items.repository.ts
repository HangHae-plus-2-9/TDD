import { Injectable } from '@nestjs/common';
import { OrderItemEntity } from './entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemModel } from './models/order-item.model';
import { orderItemEntityToModel } from './mappers/order.mapper';

const ORDER_ITEM_ENTITIES = [];

@Injectable()
export class OrderItemsRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly model: Repository<OrderItemEntity>,
  ) {}

  async createManyWithOrderId(
    orderId: number,
    orderItemModels: OrderItemModel[],
  ): Promise<OrderItemModel[]> {
    return await orderItemModels.map((item) => {
      const orderItemEntity = {
        ...item,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      } as OrderItemEntity;
      ORDER_ITEM_ENTITIES.push({ ...orderItemEntity });
      return orderItemEntityToModel(orderItemEntity);
    });
  }

  async findByOrderId(orderId: number): Promise<any[]> {
    return ORDER_ITEM_ENTITIES.filter((item) => item.order_id === orderId);
  }

  async removeByOrderId(orderId: number): Promise<void> {
    ORDER_ITEM_ENTITIES.filter((item) => item.order_id !== orderId);
  }
}
