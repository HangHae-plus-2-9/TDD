import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';
import { OrderItemModel } from '../models/order-item.model';
import { OrderModel } from '../models/order.model';

export const orderEntityToModel = (entity: OrderEntity): OrderModel => {
  return {
    id: entity.id,
    customer_id: entity.customer_id,
    payment: {
      method: entity.payment_method,
      amount: entity.payment_amount,
      paidAt: entity.paid_at,
    },
    shipping: {
      courierName: entity.courier_name,
      invoiceNumber: entity.invoice_number,
      address: entity.shipping_address,
      receiver: entity.shipping_receiver,
      receiverPhone: entity.shipping_receiver_phone,
      departedAt: entity.departed_at,
      arrivedAt: entity.arrived_at,
    },
    canceled_at: entity.canceled_at,
  } as OrderModel;
};

export const orderItemEntityToModel = (
  entity: OrderItemEntity,
): OrderItemModel => {
  return {
    id: entity.id,
    order_id: entity.order_id,
    product_id: entity.product_id,
    quantity: entity.quantity,
    price: entity.price,
  } as OrderItemModel;
};
