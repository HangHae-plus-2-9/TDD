import { Injectable } from '@nestjs/common';
import { OrderItemEntity } from './entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemModel } from './models/order-item.model';
import {
  orderItemEntityToModel,
  orderItemModelToEntity,
} from './mappers/order.mapper';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import _ from 'lodash';

@Injectable()
export class OrderItemsRepository {
  constructor(
    private readonly cLogger: WinstonContextLogger,
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
    const orderItemEntities = await this.model.find({
      where: { order_id: orderId },
    });
    return await orderItemEntities.map((entity) =>
      orderItemEntityToModel(entity),
    );
  }

  async updateManyWithOrderId(
    orderId: number,
    newOrderItemModels: OrderItemModel[],
  ): Promise<OrderItemModel[]> {
    const orderItemEntities = await this.model.find({
      where: { order_id: orderId },
    });
    const newOrderItemEntities = newOrderItemModels.map((item) =>
      orderItemModelToEntity(item),
    );
    /**
     * remove order items whose quantity is 0
     */
    const willBeRemovedOrderItemsProductIds = newOrderItemEntities.map(
      (item) => {
        if (item.quantity === 0) {
          return item.product_id;
        }
      },
    );
    const willBeRemovedOrderItemEntities = orderItemEntities.filter((item) =>
      willBeRemovedOrderItemsProductIds.includes(item.product_id),
    );
    if (willBeRemovedOrderItemEntities.length > 0)
      await this.model.softDelete(
        willBeRemovedOrderItemEntities.map((item) => item.id),
      );

    // update order items whose quantity is not 0
    const willBeUpdatedOrderItemEntities = orderItemEntities.filter(
      (item) => !willBeRemovedOrderItemEntities.includes(item),
    );
    const updatedOrderItemEntities = await Promise.all(
      willBeUpdatedOrderItemEntities.map(async (item) => {
        const updatedItemEntity = await this.model.save({
          ...newOrderItemEntities.find(
            (orderItem) => orderItem.product_id === item.product_id,
          ),
          id: item.id,
        });
        return updatedItemEntity;
      }),
    );

    return updatedOrderItemEntities.map((item) => orderItemEntityToModel(item));
  }

  async removeByOrderId(orderId: number): Promise<void> {
    await this.model.softDelete({ order_id: orderId });
  }
}
