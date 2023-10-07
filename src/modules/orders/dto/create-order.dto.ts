export class CreateOrderDto {
  customerId: number;
  orderItems: {
    productId: number;
    quantity: number;
  }[];
  payment: {
    method: string;
    amount: number;
  };
  shipping: {
    address: string;
    receiver: string;
    receiverPhone: string;
  };
}
