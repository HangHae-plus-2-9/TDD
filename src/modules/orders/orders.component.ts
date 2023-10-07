import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepositoryInterface } from './interfaces/orders-repository.interface';

@Injectable()
export class OrdersComponent {
  constructor(
    @Inject('OrdersRepositoryInterface')
    private readonly repo: OrdersRepositoryInterface,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    // return this.repo.create(createOrderDto);
  }
}
