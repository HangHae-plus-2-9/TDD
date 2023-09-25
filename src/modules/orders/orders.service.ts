import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersComponent } from './orders.component';
import { OrdersRepositoryInterface } from './interfaces/orders-repository.interface';

@Injectable()
export class OrdersService {
  constructor(
    private readonly comp: OrdersComponent,
    @Inject('OrdersRepositoryInterface')
    private readonly repo: OrdersRepositoryInterface,
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
