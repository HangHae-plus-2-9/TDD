export class CreateOrderDto {
  customerId: number;
  paymentMethod: string;
  amount: number;
  paidAt?: Date;
  canceledAt?: Date;
  courierName?: string;
  isPrepaid = true;
  invoiceNumber?: string;
  shippingAddress: string;
  shippingReceiver: string;
  shippingReceiverPhone: string;
  shippingFee = 3000;
  departedAt?: Date;
  arrivedAt?: Date;
  orderItems: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}
