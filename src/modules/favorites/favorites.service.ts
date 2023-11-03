import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FavoriteProductDto } from './dto/favorite-request.dto';
import { FavoriteEntity } from './entities/favorite.entity';
import { messages } from '@/common/resources';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly cLogger: WinstonContextLogger,
    private readonly repo: FavoritesRepository,
  ) {}

  async getAllFavoriteList(id: string) {
    try {
      const favoriteList = this.repo.findAllFavoriteByUserId(id);
      return favoriteList || [];
    } catch (err) {
      this.cLogger.error(err);
      throw err;
    }
  }

  async upload(id: string, { product_id }: FavoriteProductDto) {
    try {
      const favorite = await this.saveFavorite(id, product_id);
      return favorite;
    } catch (err) {
      this.cLogger.error(err);
      throw err;
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} favorite`;
  }

  update(id: string) {
    return `This action updates a #${id} favorite`;
  }

  async saveFavorite(userId: string, productId: string) {
    try {
      const favorite = FavoriteEntity.create({
        user_id: userId,
        product_id: productId,
      });
      await this.repo.create(favorite);
      return favorite.toFavorite();
    } catch (err) {
      this.cLogger.error(err);
      throw new UnprocessableEntityException(
        messages.USER_REGISTER_FAILED_EXCEPTION,
      );
    }
  }

  async removeFavorite(id: string, product_id: string) {
    try {
      const favorite = await this.repo.findFavoriteByUserId(id, product_id);
      if (!favorite) {
        throw new UnprocessableEntityException(
          messages.FAVORITE_NOT_FOUND_EXCEPTION,
        );
      }
      await this.repo.deleteFavoriteByUserId(id, product_id);
    } catch (err) {
      this.cLogger.error(err);
      throw new UnprocessableEntityException(
        messages.USER_REGISTER_FAILED_EXCEPTION,
      );
    }
  }
}
