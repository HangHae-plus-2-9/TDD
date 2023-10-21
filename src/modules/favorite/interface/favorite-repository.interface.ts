import { BaseRepositoryInterface } from '@/common/repositories/base.repository.interface';
import { FavoriteEntity } from '../entities/favorite.entity';

export interface FavoriteRepositoryInterface
  extends BaseRepositoryInterface<FavoriteEntity> {
  findAllFavoriteByUserId(userId: number): Promise<FavoriteEntity[]>;

  findfavoriteByUserId(
    userId: number,
    productId: number,
  ): Promise<FavoriteEntity>;

  deleteFavoriteByUserId(user_id: number, product: number);
}
