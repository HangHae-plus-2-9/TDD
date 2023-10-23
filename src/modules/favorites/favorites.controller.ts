import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Auth, AuthUser } from '@/common/decorators';
import { ROLE_TYPE } from '@/common/resources';
import { AccessTokenPayload } from '../auth/dto/access-token-payload.dto';
import { FavoriteProductDto } from './dto/favorite-request.dto';

@Controller({ version: '1', path: 'favorite' })
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/add')
  @Auth([ROLE_TYPE.ADMIN])
  async uploadFavoriteList(
    @AuthUser() tokenPayload: AccessTokenPayload,
    @Body() favoriteProductDto: FavoriteProductDto,
  ) {
    return this.favoritesService.upload(
      tokenPayload.userId,
      favoriteProductDto,
    );
  }

  @Get('/:id')
  @Auth([ROLE_TYPE.ADMIN])
  async getAllFavorite(@AuthUser() tokenPayload: AccessTokenPayload) {
    return this.favoritesService.getAllFavoriteList(tokenPayload.userId);
  }

  @Delete('/:productId')
  @Auth([ROLE_TYPE.ADMIN])
  async deleteFavorite(
    @AuthUser() tokenPayload: AccessTokenPayload,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.favoritesService.removeFavorite(tokenPayload.userId, productId);
  }
}
