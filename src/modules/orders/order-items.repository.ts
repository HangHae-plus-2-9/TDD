import { Injectable } from '@nestjs/common';
import { OrderItemEntity } from './entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemModel } from './models/order-item.model';
import {
  orderItemEntityToModel,
  orderItemModelToEntity,
} from './mappers/order.mapper';

let ORDER_ITEM_ENTITIES = [];

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
    const orderItemEntities = orderItemModels.map((item) =>
      orderItemModelToEntity(item),
    );
    return await Promise.all(
      orderItemEntities
        .map(async (item) => {
          item.order_id = orderId;
          return await this.model.save(item);
        })
        .map(async (item) => orderItemEntityToModel(await item)),
    );
  }

  async getByOrderId(orderId: number): Promise<OrderItemModel[]> {
    const orderItemEntities = ORDER_ITEM_ENTITIES.filter(
      (item) => item.order_id === orderId,
    );
    return await orderItemEntities.map((entity) =>
      orderItemEntityToModel(entity),
    );
  }

  async updateManyWithOrderId(
    orderId: number,
    orderItemModels: OrderItemModel[],
  ): Promise<OrderItemModel[]> {
    const orderItemEntities = ORDER_ITEM_ENTITIES.filter(
      (item) => item.order_id === orderId,
    );

    // remove order items whose quantity is 0
    const willBeRemovedOrderItemsProductIds = orderItemModels.map((item) => {
      if (item.quantity === 0) {
        return item.productId;
      }
    });
    const willBeRemovedOrderItemEntities = orderItemEntities.filter((item) =>
      willBeRemovedOrderItemsProductIds.includes(item.product_id),
    );
    ORDER_ITEM_ENTITIES = ORDER_ITEM_ENTITIES.filter(
      (item) => !willBeRemovedOrderItemEntities.includes(item),
    );

    // update order items whose quantity is not 0
    const willBeUpdatedOrderItemEntities = orderItemEntities.filter(
      (item) => !willBeRemovedOrderItemEntities.includes(item),
    );
    willBeUpdatedOrderItemEntities.map((item) => {
      const orderItemModel = orderItemModels.find(
        (model) => model.productId === item.product_id,
      );
      item.quantity = orderItemModel.quantity;
      return item;
    });

    return await willBeUpdatedOrderItemEntities.map((item) =>
      orderItemEntityToModel(item),
    );
  }

  async removeByOrderId(orderId: number): Promise<void> {
    ORDER_ITEM_ENTITIES.filter((item) => item.order_id !== orderId);
  }
}
