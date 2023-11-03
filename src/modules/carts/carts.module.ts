import { Logger, Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-item.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CartItemsRepository } from './cart-items.repository';
import { CartsRepository } from './carts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    AuthModule,
    UsersModule,
  ],
  controllers: [CartsController],
  providers: [Logger, CartsService, CartsRepository, CartItemsRepository],
})
export class CartsModule {}
