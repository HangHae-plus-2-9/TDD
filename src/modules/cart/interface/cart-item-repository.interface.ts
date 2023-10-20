import { BaseRepositoryInterface } from '@/common/repositories/base.repository.interface';
import { CartItemEntity } from '../entities/cart-items.entity';

export interface CartItemRepositoryInterface
  extends BaseRepositoryInterface<CartItemEntity> {
  findAllCartData(cartId: number): Promise<CartItemEntity[]>;

  findCartItemByCartId(
    cartId: number,
    productId: number,
  ): Promise<CartItemEntity>;
}
