import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';
import { OrderItemModel } from '../models/order-item.model';
import { OrderModel } from '../models/order.model';

export const orderEntityToModel = (entity: OrderEntity): OrderModel => {
  return {
    id: entity.id,
    customerId: entity.customer_id,
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
    canceledAt: entity.canceled_at,
  } as OrderModel;
};

export const orderItemEntityToModel = (
  entity: OrderItemEntity,
): OrderItemModel => {
  return {
    id: entity.id,
    orderId: entity.order_id,
    productId: entity.product_id,
    quantity: entity.quantity,
    price: entity.price,
  } as OrderItemModel;
};
