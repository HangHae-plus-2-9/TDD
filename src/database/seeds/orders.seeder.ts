import { COURIER_LIST, PAYMENT_METHOD } from '@/common/resources';
import { OrderEntity } from '@/modules/orders/entities/order.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class OrdersSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(OrderEntity);
    await repository.insert([
      {
        id: '93fd5c73-6992-4973-bdf2-15872518057a',
        customer_id: 'bc4806f0-8668-4998-b610-27a046b9c4cd',
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
        id: 'ec930a41-392a-4f75-83fc-9bc6cadd05a0',
        customer_id: 'bc4806f0-8668-4998-b610-27a046b9c4cd',
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
