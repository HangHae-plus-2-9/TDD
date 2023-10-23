import { Logger, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-items.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CartItemRepository } from './cart-item.repository';
import { CartRepository } from './cart.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    AuthModule,
    UsersModule,
  ],
  controllers: [CartController],
  providers: [Logger, CartService, CartRepository, CartItemRepository],
})
export class CartModule {}
