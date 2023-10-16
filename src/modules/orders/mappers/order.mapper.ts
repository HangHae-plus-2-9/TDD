import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';
import { OrderItemModel } from '../models/order-item.model';
import { OrderModel } from '../models/order.model';

export const createDtoToSpec = (dto: any) => {
  return {
    payment: {
      method: dto.paymentMethod,
      amount: dto.paymentAmount,
    },
    shipping: {
      address: dto.shippingAddress,
      receiver: dto.shippingReceiver,
      receiver_phone: dto.shippingReceiverPhone,
    },
    order_items: dto.orderItems.map((item: any) => ({
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
    })),
  };
};

export const orderEntityToModel = (entity: OrderEntity): OrderModel => {
  return {
    id: entity.id,
    customer_id: entity.customer_id,
    payment: {
      method: entity.payment_method,
      amount: entity.payment_amount,
      paid_at: entity.paid_at,
    },
    shipping: {
      courier_name: entity.courier_name,
      invoice_number: entity.invoice_number,
      address: entity.shipping_address,
      receiver: entity.shipping_receiver,
      receiver_phone: entity.shipping_receiver_phone,
      departed_at: entity.departed_at,
      arrived_at: entity.arrived_at,
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
