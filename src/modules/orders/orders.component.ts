import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersComponent {
  constructor(private readonly repo: OrdersRepository) {}

  create(createOrderDto: CreateOrderDto) {
    return this.repo.create(createOrderDto);
  }
}
