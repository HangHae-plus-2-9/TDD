import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersComponent } from './orders.component';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly comp: OrdersComponent,
    private readonly repo: OrdersRepository,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.comp.create(createOrderDto);
  }

  findAll() {
    return this.repo.all();
  }

  findOne(id: number) {
    return this.repo.findById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.repo.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
