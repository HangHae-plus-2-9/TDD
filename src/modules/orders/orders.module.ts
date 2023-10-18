import { Logger, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';
import { OrderItemsRepository } from './order-items.repository';
import { OrderItemEntity } from './entities/order-item.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [Logger, OrdersService, OrdersRepository, OrderItemsRepository],
})
export class OrdersModule {}
