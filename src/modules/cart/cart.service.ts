import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCartItemsDto } from './dto/create-cart.dto';
import { UpdateCartItemsDto } from './dto/update-cart.dto';
import { Logger } from '@nestjs/common';
import { messages } from '@/common/resources';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-items.entity';
import { CartRepositoryInterface } from './interface/cart-repository.interface';
import { CartItemRepositoryInterface } from './interface/cart-item-repository.interface';

@Injectable()
export class CartService {
  constructor(
    private readonly logger: Logger,
    @Inject('CartRepositoryInterface')
    private readonly repo: CartRepositoryInterface,
    @Inject('CartItemRepositoryInterface')
    private readonly cartItemRepo: CartItemRepositoryInterface,
  ) {}

  async create(userId: number, createCartItemsDto: CreateCartItemsDto) {
    try {
      let cartId: number | null;
      // eslint-disable-next-line prefer-const
      const cart = await this.repo.findCart(userId);
      if (!cart) {
        const newCart = await this.createCart(userId);
        cartId = newCart.id;
      } else {
        cartId = cart.id;
      }

      const newCartItem = await this.createCartItem(
        cartId,
        createCartItemsDto.product_id,
        createCartItemsDto.quantity,
      );

      return newCartItem;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getCartData(id: number) {
    try {
      const cartData = await this.repo.findCart(id);
      const cartId = cartData.id;
      if (!cartId) {
        throw new UnprocessableEntityException(
          messages.CART_NOT_FOUNT_EXCEPTION,
        );
      }

      return await this.cartItemRepo.findAllCartData(cartId);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(
    userId: number,
    productId: number,
    updateCartItemsDto: UpdateCartItemsDto,
  ) {
    try {
      const cartData = await this.repo.findCart(userId);
      const cartId = cartData.id;
      if (!cartId) {
        throw new UnprocessableEntityException(
          messages.CART_NOT_FOUNT_EXCEPTION,
        );
      }

      const cartItem = await this.cartItemRepo.findCartItemByCartId(
        cartId,
        productId,
      );

      if (cartItem) {
        cartItem.quantity = updateCartItemsDto.quantity;
      }
      cartItem.save();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async remove(userId: number, productId: number) {
    try {
      const cartData = await this.repo.findCart(userId);
      const cartId = cartData.id;
      if (!cartId) {
        throw new UnprocessableEntityException(
          messages.CART_NOT_FOUNT_EXCEPTION,
        );
      }
      await CartItemEntity.delete({
        cart_id: cartId,
        product_id: productId,
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  private async createCart(id: number) {
    try {
      const cart = CartEntity.create({
        customer_id: id,
      });
      await this.repo.create(cart);
      return cart.toCart();
    } catch (err) {
      this.logger.error(err);
      throw new UnprocessableEntityException(messages.CART_NOT_FOUNT_EXCEPTION);
    }
  }

  private async createCartItem(
    cart_id: number,
    product_id: number,
    quantity: number,
  ) {
    try {
      const cartItem = CartItemEntity.create({
        cart_id,
        product_id,
        quantity,
      });
      await this.cartItemRepo.create(cartItem);
      return cartItem.toCartItem();
    } catch (err) {
      this.logger.error(err);
      throw new UnprocessableEntityException(messages.CART_NOT_FOUNT_EXCEPTION);
    }
  }
}
