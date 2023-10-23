import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from './entities/cart-items.entity';

@Injectable()
export class CartItemRepository {
  constructor(
    @InjectRepository(CartItemEntity)
    private readonly model: Repository<CartItemEntity>,
  ) {}

  async create(cartItemEntity: CartItemEntity): Promise<CartItemEntity> {
    return await this.model.save(cartItemEntity);
  }

  async findAllCartData(cartId: number): Promise<CartItemEntity[]> {
    if (!cartId) return null;
    return await this.model.find({
      where: { cart_id: cartId },
    });
  }

  async findCartItemByCartId(
    cartId: number,
    productId: number,
  ): Promise<CartItemEntity> {
    if (!cartId) return null;
    return await this.model.findOne({
      where: {
        cart_id: cartId,
        product: productId,
      },
    });
  }
}
