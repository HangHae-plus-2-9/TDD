import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Auth, AuthUser } from '@/common/decorators';
import { ROLE_TYPE } from '@/common/resources';
import { AccessTokenPayload } from '../auth/dto/access-token-payload.dto';
import { FavoriteProductDto } from './dto/favorite-request.dto';

@Controller({ version: '1', path: 'favorite' })
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('/add')
  @Auth([ROLE_TYPE.ADMIN])
  async uploadFavoriteList(
    @AuthUser() tokenPayload: AccessTokenPayload,
    @Body() favoriteProductDto: FavoriteProductDto,
  ) {
    return this.favoriteService.upload(tokenPayload.userId, favoriteProductDto);
  }

  @Get('/:id')
  @Auth([ROLE_TYPE.ADMIN])
  async getAllfavorite(@AuthUser() toeknPayload: AccessTokenPayload) {
    return this.favoriteService.getAllfavoriteList(toeknPayload.userId);
  }

  @Delete('/:productId')
  @Auth([ROLE_TYPE.ADMIN])
  async deleteFavorite(
    @AuthUser() tokenPayload: AccessTokenPayload,
    @Param('productId') productId: number,
  ) {
    return this.favoriteService.removeFavorite(tokenPayload.userId, +productId);
  }
}
