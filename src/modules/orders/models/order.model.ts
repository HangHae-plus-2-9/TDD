import { OrderItemModel } from './order-item.model';

export type OrderModel = {
  id?: number;
  customer_id: number;
  payment: {
    method: string;
    amount: number;
    paid_at?: Date;
  };
  shipping: {
    courier_name: string;
    invoice_number: string;
    address: string;
    receiver: string;
    receiver_phone: string;
    departed_at?: Date;
    arrived_at?: Date;
  };
  canceled_at?: Date;
  order_items: OrderItemModel[];
};
