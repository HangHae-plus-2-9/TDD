import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderModel } from './models/order.model';
import { orderEntityToModel, orderModelToEntity } from './mappers/order.mapper';
import { OrderNotFoundException } from '@/common/exceptions';

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
    return (await this.model.find()).map((entity) =>
      orderEntityToModel(entity),
    );
  }

  async getByOrderId(id: number): Promise<OrderModel> {
    const orderEntity = await this.model.findOne({
      where: { id },
    });
    if (!orderEntity) {
      throw new OrderNotFoundException();
    }
    return orderEntityToModel(orderEntity);
  }

  async update(id: number, newOrderModel: OrderModel): Promise<OrderModel> {
    const orderEntity = await this.model.findOne({
      where: { id },
    });
    if (!orderEntity) {
      throw new Error('Order not found');
    }
    const newOrderEntity = await this.model.save({
      ...orderEntity,
      ...orderModelToEntity(newOrderModel),
    });
    return orderEntityToModel(newOrderEntity);
  }

  async removeByOrderId(id: number): Promise<OrderModel> {
    const orderEntity = await this.model.findOne({
      where: { id },
    });
    if (!orderEntity) {
      throw new Error('Order not found');
    }
    await this.model.softDelete(id);
    return orderEntityToModel(orderEntity);
  }
}
