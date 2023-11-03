import { SEEDER } from '@/common/resources';
import { OrderItemEntity } from '@/modules/orders/entities/order-item.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

const orderId1 = SEEDER.orderId1;
const orderId2 = SEEDER.orderId2;
const orderItemId11 = SEEDER.orderItemId11;
const orderItemId12 = SEEDER.orderItemId12;
const orderItemId21 = SEEDER.orderItemId21;
const orderItemId22 = SEEDER.orderItemId22;
const productId1 = SEEDER.productId1;
const productId2 = SEEDER.productId2;
const productId3 = SEEDER.productId3;

export default class OrderItemsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(OrderItemEntity);
    await repository.insert([
      {
        id: orderItemId11,
        order_id: orderId1,
        product_id: productId1,
        quantity: 1,
        price: 1000,
      },
      {
        id: orderItemId12,
        order_id: orderId1,
        product_id: productId2,
        quantity: 2,
        price: 2000,
      },
      {
        id: orderItemId21,
        order_id: orderId2,
        product_id: productId1,
        quantity: 3,
        price: 1000,
      },
      {
        id: orderItemId22,
        order_id: orderId2,
        product_id: productId3,
        quantity: 4,
        price: 3000,
      },
    ]);
    console.log('OrderItemsSeeder done');
  }
}
