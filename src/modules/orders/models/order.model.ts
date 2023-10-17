import { CreatePaymentDto } from '../dto/create-payment.dto';
import { CreateShippingDto } from '../dto/create-shipping.dto';
import { OrderItemModel } from './order-item.model';

export type OrderModel = {
  id?: number;
  customer_id: number;
  payment: CreatePaymentDto;
  shipping: CreateShippingDto;
  canceled_at?: Date;
  order_items: OrderItemModel[];
};
