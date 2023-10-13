import { BaseRepository } from '@/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteRepositoryInterface } from './interface/favorite-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteProductDto } from './dto/favorite-request.dto';

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

  async findAllFavoriteByUserId(userId: number): Promise<FavoriteEntity[]> {
    if (!userId) return null;
    return await this.model.find({
      where: { user_id: userId },
    });
  }

  async uploadFavorite(
    user_id: number,
    favoriteProductDto: FavoriteProductDto,
  ) {
    if (!favoriteProductDto) return null;
    return await this.model.save({
      user_id,
      product_id: favoriteProductDto.product_id,
    });
  }

  async deleteFavoriteByUserId(user_id: number, product_id: number) {
    return await this.model.delete({
      user_id,
      product_id,
    });
  }
}
