import { PRODUCT_STATUS } from '@/common/resources';
import { ProductEntity } from '@/modules/products/entities/product.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class ProductsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ProductEntity);
    await repository.insert([
      {
        id: 100001,
        seller_id: 1,
        name: 'iPhone 15',
        cat_name: 'Smartphone',
        desc: 'The latest iPhone',
        price: 2000,
        stock: 10,
        status: PRODUCT_STATUS.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      } as ProductEntity,
      {
        id: 100002,
        seller_id: 1,
        name: 'iPhone 14',
        cat_name: 'Smartphone',
        desc: 'The latest iPhone',
        price: 1000,
        stock: 10,
        status: PRODUCT_STATUS.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      } as ProductEntity,
      {
        id: 100003,
        seller_id: 2,
        name: 'Surface Pro 8',
        cat_name: 'Laptop',
        desc: 'The latest Surface Pro',
        price: 2000,
        stock: 10,
        status: PRODUCT_STATUS.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      } as ProductEntity,
    ]);
  }
}
