import { BaseRepositoryInterface } from '@/common/repositories/base.repository.interface';
import { FavoriteEntity } from '../entities/favorite.entity';
import { FavoriteProductDto } from '../dto/favorite-request.dto';

// eslint-disable-next-line prettier/prettier
export interface FavoriteRepositoryInterface 
  extends BaseRepositoryInterface<FavoriteEntity> {
  findAllFavoriteByUserId(
    userId: number,
  ): Promise<{ user_id: number; product_id: number }>;

  deleteFavoriteByUserId(user_id: number, product_id: number): any;
}
