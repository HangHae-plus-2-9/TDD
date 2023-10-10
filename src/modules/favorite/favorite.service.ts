import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Logger } from 'winston';
import { FavoriteRepositoryInterface } from './interface/favorite-repository.interface';
import { FavoriteProductDto } from './dto/favorite-request.dto';
import { FavoriteEntity } from './entities/favorite.entity';
import { messages } from '@/common/resources';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly logger: Logger,
    @Inject('FavoriteRepositoryInterface')
    private readonly repo: FavoriteRepositoryInterface,
    private readonly userRepo: UsersRepository,
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
      const user = await this.userRepo.findById(id);
      if (!user) {
        throw new UnprocessableEntityException(
          messages.USER_NOT_FOUND_EXCEPTION,
        );
      }
      const favorite = await this.saveFavorite(id, product_id);
      return favorite;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  create(id: number, { product_id }: FavoriteProductDto) {
    return 'This action adds a new favorite';
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  public async saveFavorite(user_id: number, product_id: number) {
    try {
      const favorite = FavoriteEntity.create({
        user_id,
        product_id,
      });
      await this.repo.create(favorite);
      return favorite.toFavorite;
    } catch (err) {
      this.logger.error(err);
      throw new UnprocessableEntityException(
        messages.USER_REGISTER_FAILED_EXCEPTION,
      );
    }
  }

  public async removeFavorite(id: number, product_id: number) {
    try {
      const user = await this.userRepo.findById(id);
      if (!user) {
        throw new UnprocessableEntityException(
          messages.USER_NOT_FOUND_EXCEPTION,
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
