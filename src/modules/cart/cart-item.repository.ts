import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/common/repositories/base.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from './entities/cart-items.entity';
import { CartItemRepositoryInterface } from './interface/cart-item-repository.interface';

@Injectable()
export class CartItemRepository
  extends BaseRepository<CartItemEntity>
  implements CartItemRepositoryInterface
{
  constructor(
    @InjectRepository(CartItemEntity)
    private readonly model: Repository<CartItemEntity>,
  ) {
    super(model);
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
