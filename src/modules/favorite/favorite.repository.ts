import { BaseRepository } from '@/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteRepositoryInterface } from './interface/favorite-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoirteRepository
  extends BaseRepository<FavoriteEntity>
  implements FavoriteRepositoryInterface
{
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly model: Repository<FavoriteEntity>,
  ) {
    super(model);
  }
  async findfavoriteByUserId(
    userId: number,
    productId: number,
  ): Promise<FavoriteEntity> {
    if (!userId || !productId) return null;
    console.log(userId, productId);
    return await this.model.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });
  }

  async findAllFavoriteByUserId(userId: number): Promise<FavoriteEntity[]> {
    if (!userId) return null;
    return await this.model.find({
      where: { user_id: userId },
    });
  }

  async deleteFavoriteByUserId(userId: number, productId: number) {
    console.log('herE?', userId, productId);
    return await this.model.delete({
      user_id: userId,
      product_id: productId,
    });
  }
}
