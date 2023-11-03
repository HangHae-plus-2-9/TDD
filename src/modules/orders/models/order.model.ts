import { CreatePaymentDto } from '../dto/create-payment.dto';
import { CreateShippingDto } from '../dto/create-shipping.dto';
import { OrderItemModel } from './order-item.model';

export type OrderModel = {
  id: string;
  customerId: string;
  payment: CreatePaymentDto;
  shipping: CreateShippingDto;
  canceledAt?: Date;
  orderItems: OrderItemModel[];
};
