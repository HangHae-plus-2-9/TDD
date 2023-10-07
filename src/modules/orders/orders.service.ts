import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersComponent } from './orders.component';
import { OrdersRepositoryInterface } from './interfaces/orders-repository.interface';
import { OrderEntity } from './entities/order.entity';
import { OrderNotFoundException } from '@/common/exceptions';
import { OrderItemEntity } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly comp: OrdersComponent,
    @Inject('OrdersRepositoryInterface')
    private readonly repo: OrdersRepositoryInterface,
  ) {}

  ORDERS: OrderEntity[] = [];
  PAYMENTS: any[] = [];
  SHIPPING: any[] = [];
  ORDER_ITEMS: OrderItemEntity[] = [];

  async create(createOrderDto: CreateOrderDto): Promise<any> {
    return {
      payment: {
        method: 'CREDIT_CARD',
        amount: 10000,
      },
      shipping: {
        address: '서울시 강남구',
        receiver: '홍길동',
        receiverPhone: '01012345678',
      },
    };
    const order = OrderEntity.create({
      id: this.ORDERS.length + 1,
      canceled_at: null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
    const payment = {
      id: this.PAYMENTS.length + 1,
      orderId: order.id,
      method: createOrderDto.payment.method,
      amount: createOrderDto.payment.amount,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    const shipping = {
      id: this.SHIPPING.length + 1,
      orderId: order.id,
      address: createOrderDto.shipping.address,
      receiver: createOrderDto.shipping.receiver,
      receiverPhone: createOrderDto.shipping.receiverPhone,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    const orderItem = OrderItemEntity.create({
      id: this.ORDER_ITEMS.length + 1,
      orderId: order.id,
      productId: Math.floor(Math.random() * 10) + 1,
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
    this.ORDERS.push(order);
    this.ORDER_ITEMS.push(orderItem);
    order.order_items = this.ORDER_ITEMS.filter(
      (item) => item.orderId === order.id,
    );
    return order;
    // return this.comp.create(createOrderDto);
  }

  async findAll() {
    return await this.ORDERS;
    // return this.repo.all();
  }

  async findOne(id: number) {
    return await this.ORDERS.find((order) => order.id === id);
    // return this.repo.findById(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = this.findOne(id);
    if (!order) {
      throw new OrderNotFoundException();
    }
    Object.assign(order, updateOrderDto);
    return await order;
    // return this.repo.update(id, updateOrderDto);
  }

  async remove(id: number) {
    const order = this.findOne(id);
    if (!order) {
      throw new OrderNotFoundException();
    }
    this.ORDERS = this.ORDERS.filter((order) => order.id !== id);
    return await order;
    // return this.repo.remove(id);
  }
}
