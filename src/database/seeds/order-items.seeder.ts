import { OrderItemEntity } from '@/modules/orders/entities/order-item.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class OrderItemsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(OrderItemEntity);
    await repository.insert([]);
  }
}
