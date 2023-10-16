export class CreateOrderDto {
  customerId: number;
  paymentMethod: string;
  paymentAmount: number;
  shippingAddress: string;
  shippingReceiver: string;
  shippingReceiverPhone: string;
  orderItems: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}
