import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartItemsDto } from './dto/create-cart.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpdateCartItemsDto } from './dto/update-cart.dto';
import { Auth, AuthUser } from '@/common/decorators';
import { ROLE_TYPE } from '@/common/resources';
import { AccessTokenPayload } from '../auth/dto/access-token-payload.dto';

@Controller({ version: '1', path: 'carts' })
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @Auth([ROLE_TYPE.ADMIN])
  async addCart(
    @AuthUser() tokenPayload: AccessTokenPayload,
    @Body() createCartItemsDto: CreateCartItemsDto,
  ) {
    return this.cartsService.create(tokenPayload.userId, createCartItemsDto);
  }

  // @Get()
  // findAll() {
  //   return this.cartsService.findAll();
  // }

  @Get()
  @Auth([ROLE_TYPE.ADMIN])
  async getCart(@AuthUser() tokenPayload: AccessTokenPayload) {
    return this.cartsService.getCartData(tokenPayload.userId);
  }

  @Patch(':id')
  @Auth([ROLE_TYPE.ADMIN])
  async updateQuantity(
    @Param('id', ParseUUIDPipe) productId: string,
    @AuthUser() tokenPayload: AccessTokenPayload,
    @Body() UpdateCartItemsDto: UpdateCartItemsDto,
  ) {
    return this.cartsService.update(
      tokenPayload.userId,
      productId,
      UpdateCartItemsDto,
    );
  }

  @Delete(':id')
  @Auth([ROLE_TYPE.ADMIN])
  async removeCart(
    @Param('id', ParseUUIDPipe) productId: string,
    @AuthUser() tokenPayload: AccessTokenPayload,
  ) {
    return this.cartsService.remove(tokenPayload.userId, productId);
  }
}
