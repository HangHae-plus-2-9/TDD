import { PRODUCT_STATUS } from '@/common/resources';
import { ProductEntity } from '@/modules/products/entities/product.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class ProductsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ProductEntity);
    await repository.insert([
      {
        id: 'e58ebbc1-6d85-46c2-8c1b-183ded15f9bc',
        seller_id: '0fbfde54-4d15-490f-8653-899236631d9e',
        name: 'iPhone 15',
        cat_name: 'Smartphone',
        desc: 'The latest iPhone',
        price: 2000,
        stock: 100,
        status: PRODUCT_STATUS.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      } as ProductEntity,
      {
        id: 'dc620d83-f58b-4109-ac34-9467a71c4117',
        seller_id: '0fbfde54-4d15-490f-8653-899236631d9e',
        name: 'iPhone 14',
        cat_name: 'Smartphone',
        desc: 'The latest iPhone',
        price: 1000,
        stock: 100,
        status: PRODUCT_STATUS.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      } as ProductEntity,
      {
        id: '90bfe00d-832d-4459-9537-ebc47418965a',
        seller_id: 'd699cb8f-cb9e-4301-ad12-d7d859cc6f3f',
        name: 'Surface Pro 8',
        cat_name: 'Laptop',
        desc: 'The latest Surface Pro',
        price: 2000,
        stock: 100,
        status: PRODUCT_STATUS.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      } as ProductEntity,
    ]);
  }
}
