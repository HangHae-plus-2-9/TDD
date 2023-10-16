export type OrderSpec = {
  payment: {
    method: string;
    amount: number;
  };
  shipping: {
    address: string;
    receiver: string;
    receiver_phone: string;
  };
  order_items: {
    product_id: number;
    quantity: number;
    price: number;
  }[];
};
