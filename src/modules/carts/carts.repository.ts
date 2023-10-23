import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartsRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly model: Repository<CartEntity>,
  ) {}

  async create(cartEntity: CartEntity): Promise<CartEntity> {
    return await this.model.save(cartEntity);
  }

  async findCart(userId: number): Promise<CartEntity> {
    if (!userId) return null;
    return await this.model.findOne({
      where: { customer_id: userId },
    });
  }
}
