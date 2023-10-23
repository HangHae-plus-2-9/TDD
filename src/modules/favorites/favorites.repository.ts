import { Injectable } from '@nestjs/common';
import { FavoriteEntity } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesRepository {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly model: Repository<FavoriteEntity>,
  ) {}

  async create(favoriteEntity: FavoriteEntity): Promise<FavoriteEntity> {
    return await this.model.save(favoriteEntity);
  }

  async findFavoriteByUserId(
    userId: number,
    productId: number,
  ): Promise<FavoriteEntity> {
    if (!userId || !productId) return null;
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
    return await this.model.delete({
      user_id: userId,
      product_id: productId,
    });
  }
}
