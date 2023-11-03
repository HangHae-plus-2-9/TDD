import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from './entities/cart-item.entity';

@Injectable()
export class CartItemsRepository {
  constructor(
    @InjectRepository(CartItemEntity)
    private readonly model: Repository<CartItemEntity>,
  ) {}

  async create(cartItemEntity: CartItemEntity): Promise<CartItemEntity> {
    return await this.model.save(cartItemEntity);
  }

  async findAllCartData(cartId: string): Promise<CartItemEntity[]> {
    if (!cartId) return null;
    return await this.model.find({
      where: { cart_id: cartId },
    });
  }

  async findCartItemByCartId(
    cartId: string,
    productId: string,
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
