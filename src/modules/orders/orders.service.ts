import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepositoryInterface } from './interfaces/orders-repository.interface';
import { OrderEntity } from './entities/order.entity';
import { OrderNotFoundException } from '@/common/exceptions';
import { OrderItemEntity } from './entities/order-item.entity';

let ORDERS: OrderEntity[] = [];
let ORDER_ITEMS: OrderItemEntity[] = [];

@Injectable()
export class OrdersService {
  constructor(
    @Inject('OrdersRepositoryInterface')
    private readonly repo: OrdersRepositoryInterface,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<any> {
    const order = OrderEntity.create({
      customer_id: createOrderDto.customerId,
      payment_method: createOrderDto.paymentMethod,
      paid_at: createOrderDto.paidAt,
      canceled_at: createOrderDto.canceledAt,
      courier_name: createOrderDto.courierName,
      is_prepaid: createOrderDto.isPrepaid,
      invoice_number: createOrderDto.invoiceNumber,
      shipping_address: createOrderDto.shippingAddress,
      shipping_receiver: createOrderDto.shippingReceiver,
      shipping_receiver_phone: createOrderDto.shippingReceiverPhone,
      shipping_fee: createOrderDto.shippingFee,
      departed_at: createOrderDto.departedAt,
      arrived_at: createOrderDto.arrivedAt,
    });
    ORDERS.push(order);

    let totAmount = 0;
    const orderItems = createOrderDto.orderItems.map((item) => {
      // TODO: check product
      // const product = this.productsService.findOne(item.productId);
      totAmount += item.price * item.quantity;
      return OrderItemEntity.create({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    });
    ORDER_ITEMS = ORDER_ITEMS.concat(orderItems);

    order.amount = totAmount;
    order.order_items = orderItems;
    return await order;
    // return this.comp.create(createOrderDto);
  }

  async findAll() {
    return await ORDERS;
    // return this.repo.all();
  }

  async findOne(id: number) {
    return await ORDERS.find((order) => order.id === id);
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
    ORDERS = ORDERS.filter((order) => order.id !== id);
    return await order;
    // return this.repo.remove(id);
  }
}
