import { CartRepositoryInterface } from './interface/cart-repository.interface';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/common/repositories/base.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartRepository
  extends BaseRepository<CartEntity>
  implements CartRepositoryInterface
{
  constructor(
    @InjectRepository(CartEntity)
    private readonly model: Repository<CartEntity>,
  ) {
    super(model);
  }
  async findCart(userId: number): Promise<CartEntity> {
    if (!userId) return null;
    return await this.model.findOne({
      where: { customer_id: userId },
    });
  }
}
