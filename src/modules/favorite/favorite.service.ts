import {
  Inject,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoriteProductDto } from './dto/favorite-request.dto';
import { FavoriteEntity } from './entities/favorite.entity';
import { messages } from '@/common/resources';
import { FavoriteRepositoryInterface } from './interface/favorite-repository.interface';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly logger: Logger,
    @Inject('FavoriteRepositoryInterface')
    private readonly repo: FavoriteRepositoryInterface,
  ) {}

  async getAllfavoriteList(id: number) {
    try {
      const favoriteList = this.repo.findAllFavoriteByUserId(id);
      return favoriteList || [];
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async upload(id: number, { product_id }: FavoriteProductDto) {
    try {
      const favorite = await this.saveFavorite(id, product_id);
      console.log('favorite', favorite);
      return favorite;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number) {
    return `This action updates a #${id} favorite`;
  }

  async saveFavorite(userId: number, productId: number) {
    try {
      const favorite = FavoriteEntity.create({
        user_id: userId,
        product_id: productId,
      });
      await this.repo.create(favorite);
      return favorite.toFavorite();
    } catch (err) {
      this.logger.error(err);
      throw new UnprocessableEntityException(
        messages.USER_REGISTER_FAILED_EXCEPTION,
      );
    }
  }

  async removeFavorite(id: number, product_id: number) {
    try {
      const favorite = await this.repo.findfavoriteByUserId(id, product_id);
      if (!favorite) {
        throw new UnprocessableEntityException(
          messages.FAVORITE_NOT_FOUND_EXCEPTION,
        );
      }
      await this.repo.deleteFavoriteByUserId(id, product_id);
    } catch (err) {
      this.logger.error(err);
      throw new UnprocessableEntityException(
        messages.USER_REGISTER_FAILED_EXCEPTION,
      );
    }
  }
}
