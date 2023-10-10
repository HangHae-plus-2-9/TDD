import { FavoriteProductDto } from './dto/favorite-request.dto';
import { BaseRepository } from '@/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { FavoriteRepositoryInterface } from './interface/favorite-repository.interface';
import { FavoriteEntity } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoirteRepository
  extends BaseRepository<FavoriteEntity>
  implements FavoriteRepositoryInterface
{
  constructor(
    @InjectRepository(FavoirteRepository)
    private readonly model: Repository<FavoriteEntity>,
  ) {
    super(model);
  }

  async findAllFavoriteByUserId(userId: number): Promise<FavoriteEntity> {
    if (!userId) return null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  async deleteFavoriteByUserId(
    user_id: number,
    { product_id }: FavoriteProductDto,
  ) {
    return await this.model.delete({
      user_id,
      product_id,
    });
  }
}
