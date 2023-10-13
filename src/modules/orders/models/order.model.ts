import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { removeUndefinedKeys } from '@/common/utils';

export class OrderModel {
  id?: number;
  customerId: number;
  paymentMethod: string;
  amount: number;
  paidAt?: Date;
  canceledAt?: Date;
  courierName: string;
  isPrepaid: boolean;
  invoiceNumber: string;
  shippingAddress: string;
  shippingReceiver: string;
  shippingReceiverPhone: string;
  shippingFee: number;
  departedAt?: Date;
  arrivedAt?: Date;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;

  toEntity() {
    const entity = new OrderEntity();
    entity.id = this.id;
    entity.customer_id = this.customerId;
    entity.payment_method = this.paymentMethod;
    entity.amount = this.amount;
    entity.paid_at = this.paidAt;
    entity.canceled_at = this.canceledAt;
    entity.courier_name = this.courierName;
    entity.is_prepaid = this.isPrepaid;
    entity.invoice_number = this.invoiceNumber;
    entity.shipping_address = this.shippingAddress;
    entity.shipping_receiver = this.shippingReceiver;
    entity.shipping_receiver_phone = this.shippingReceiverPhone;
    entity.shipping_fee = this.shippingFee;
    entity.departed_at = this.departedAt;
    entity.arrived_at = this.arrivedAt;
    return removeUndefinedKeys(entity);
  }

  static fromDto(dto: CreateOrderDto | UpdateOrderDto) {
    const model = new OrderModel();
    model.customerId = dto.customerId;
    model.paymentMethod = dto.paymentMethod;
    model.amount = dto.amount;
    model.paidAt = dto.paidAt;
    model.canceledAt = dto.canceledAt;
    model.courierName = dto.courierName;
    model.isPrepaid = dto.isPrepaid;
    model.invoiceNumber = dto.invoiceNumber;
    model.shippingAddress = dto.shippingAddress;
    model.shippingReceiver = dto.shippingReceiver;
    model.shippingReceiverPhone = dto.shippingReceiverPhone;
    model.shippingFee = dto.shippingFee;
    model.departedAt = dto.departedAt;
    model.arrivedAt = dto.arrivedAt;
    return removeUndefinedKeys(model);
  }
}
