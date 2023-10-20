import { BaseRepositoryInterface } from '@/common/repositories/base.repository.interface';
import { CartEntity } from '../entities/cart.entity';

export interface CartRepositoryInterface
  extends BaseRepositoryInterface<CartEntity> {
  findCart(user_id: number): Promise<CartEntity>;
}
