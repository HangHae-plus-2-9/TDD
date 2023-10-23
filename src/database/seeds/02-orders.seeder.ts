import { COURIER_LIST, PAYMENT_METHOD, SEEDER } from '@/common/resources';
import { OrderEntity } from '@/modules/orders/entities/order.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

const orderId1 = SEEDER.orderId1;
const orderId2 = SEEDER.orderId2;
const customerId = SEEDER.customerId;

export default class OrdersSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(OrderEntity);
    await repository.insert([
      {
        id: orderId1,
        customer_id: customerId,
        payment_method: PAYMENT_METHOD.CREDIT_CARD,
        payment_amount: 10000,
        paid_at: new Date(),
        courier_name: COURIER_LIST.CJ,
        invoice_number: '123456789',
        shipping_address: '경기도 부천시',
        shipping_receiver: '가나다',
        shipping_receiver_phone: '010-1234-5678',
        departed_at: new Date(),
        arrived_at: new Date(),
        canceled_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      } as OrderEntity,
      {
        id: orderId2,
        customer_id: customerId,
        payment_method: PAYMENT_METHOD.CREDIT_CARD,
        payment_amount: 10000,
        paid_at: new Date(),
        courier_name: COURIER_LIST.HANJIN,
        invoice_number: '123456789',
        shipping_address: '경기도 구리시',
        shipping_receiver: '라마바',
        shipping_receiver_phone: '010-1111-2222',
        departed_at: new Date(),
        arrived_at: null,
        canceled_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      } as OrderEntity,
    ]);
  }
}
