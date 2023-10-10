import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';

export class OrdersMapper {
  static toEntity(createOrderDto: CreateOrderDto) {
    return OrderEntity.create({
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
  }

  static toModelFromEntity(orderEntity: OrderEntity) {
    return {
      customer_id: orderEntity.customer_id,
      payment_method: orderEntity.payment_method,
      paid_at: orderEntity.paid_at,
      canceled_at: orderEntity.canceled_at,
      courier_name: orderEntity.courier_name,
      is_prepaid: orderEntity.is_prepaid,
      invoice_number: orderEntity.invoice_number,
      shipping_address: orderEntity.shipping_address,
      shipping_receiver: orderEntity.shipping_receiver,
      shipping_receiver_phone: orderEntity.shipping_receiver_phone,
      shipping_fee: orderEntity.shipping_fee,
      departed_at: orderEntity.departed_at,
      arrived_at: orderEntity.arrived_at,
      order_items: orderEntity.order_items,
    };
  }
}
