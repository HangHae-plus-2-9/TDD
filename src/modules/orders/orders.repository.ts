import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrdersRepositoryInterface } from './interfaces/orders-repository.interface';
import { BaseRepository } from '@/common/repositories/base.repository';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersRepository
  extends BaseRepository<OrderEntity>
  implements OrdersRepositoryInterface
{
  constructor(
    @InjectRepository(OrderEntity)
    private readonly model: Repository<OrderEntity>,
  ) {
    super(model);
  }

  doSomethingForOrder(): void {
    throw new Error('Method not implemented.');
  }

  create(createUserDto: any): any {
    console.log(createUserDto);
    return 'create with model';
  }

  all(): any {
    return 'all with model';
  }

  findById(id: number): any {
    return `findById with model with id: ${id}`;
  }

  update(id: number, updateUserDto: any): any {
    console.log(updateUserDto);
    return `update with model with id: ${id}`;
  }

  remove(id: number): any {
    return `remove with model with id: ${id}`;
  }
}
