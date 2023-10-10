import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';
import { OrderItemsRepository } from './order-items.repository';
import { OrderItemEntity } from './entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, OrderItemsRepository],
})
export class OrdersModule {}
