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

export const orderModelToEntity = (model: OrderModel): OrderEntity => {
  return {
    id: model.id,
    customer_id: model.customerId,
    payment_method: model.payment.method,
    payment_amount: model.payment.amount,
    paid_at: model.payment.paidAt,
    courier_name: model.shipping.courierName,
    invoice_number: model.shipping.invoiceNumber,
    shipping_address: model.shipping.address,
    shipping_receiver: model.shipping.receiver,
    shipping_receiver_phone: model.shipping.receiverPhone,
    departed_at: model.shipping.departedAt,
    arrived_at: model.shipping.arrivedAt,
    canceled_at: model.canceledAt,
  } as OrderEntity;
};

export const orderItemModelToEntity = (
  model: OrderItemModel,
): OrderItemEntity => {
  return {
    id: model.id,
    order_id: model.orderId,
    product_id: model.productId,
    quantity: model.quantity,
    price: model.price,
  } as OrderItemEntity;
};