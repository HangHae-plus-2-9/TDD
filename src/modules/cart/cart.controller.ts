import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemsDto } from './dto/create-cart.dto';
import { UpdateCartItemsDto } from './dto/update-cart.dto';
import { Auth, AuthUser } from '@/common/decorators';
import { ROLE_TYPE } from '@/common/resources';
import { AccessTokenPayload } from '../auth/dto/access-token-payload.dto';

@Controller({ version: '1', path: 'carts' })
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @Auth([ROLE_TYPE.ADMIN])
  async addCart(
    @AuthUser() tokenPayload: AccessTokenPayload,
    @Body() createCartItemsDto: CreateCartItemsDto,
  ) {
    return this.cartService.create(tokenPayload.userId, createCartItemsDto);
  }

  // @Get()
  // findAll() {
  //   return this.cartService.findAll();
  // }

  @Get()
  @Auth([ROLE_TYPE.ADMIN])
  async getCart(@AuthUser() tokenPayload: AccessTokenPayload) {
    return this.cartService.getCartData(tokenPayload.userId);
  }

  @Patch(':id')
  @Auth([ROLE_TYPE.ADMIN])
  async updateQuantity(
    @Param('id') productId: number,
    @AuthUser() tokenPayload: AccessTokenPayload,
    @Body() UpdateCartItemsDto: UpdateCartItemsDto,
  ) {
    return this.cartService.update(
      tokenPayload.userId,
      +productId,
      UpdateCartItemsDto,
    );
  }

  @Delete(':id')
  @Auth([ROLE_TYPE.ADMIN])
  async removeCart(
    @Param('id') productId: string,
    @AuthUser() tokenPayload: AccessTokenPayload,
  ) {
    return this.cartService.remove(tokenPayload.userId, +productId);
  }
}
