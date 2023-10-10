import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Auth, AuthUser } from '@/common/decorators';
import { ROLE_TYPE } from '@/common/resources';
import { AccessTokenPayload } from '../auth/dto/access-token-payload.dto';
import { FavoriteProductDto } from './dto/favorite-request.dto';

@Controller({ version: '1', path: 'favorite' })
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  // @Post()
  // create(@Body() createFavoriteDto: CreateFavoriteDto) {
  //   return this.favoriteService.create(createFavoriteDto);
  // }

  @Post('/')
  @Auth([ROLE_TYPE.CUSTOMER])
  async uploadFavoriteList(
    @AuthUser() tokenPayload: AccessTokenPayload,
    @Body() favoriteProductDto: FavoriteProductDto,
  ) {
    return this.favoriteService.upload(tokenPayload.userId, favoriteProductDto);
  }

  @Get('/')
  @Auth([ROLE_TYPE.CUSTOMER])
  async getAllfavorite(@AuthUser() toeknPayload: AccessTokenPayload) {
    return this.favoriteService.getAllfavoriteList(toeknPayload.userId);
  }

  @Delete('/:id')
  @Auth([ROLE_TYPE.CUSTOMER])
  async deleteFavorite(
    @AuthUser() tokenPayload: AccessTokenPayload,
    @Body() favoriteProductDto: FavoriteProductDto,
  ) {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
  //   return this.favoriteService.update(+id, updateFavoriteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.favoriteService.remove(+id);
  // }
}
