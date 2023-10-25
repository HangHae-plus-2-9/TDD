import { PRODUCT_STATUS, SEEDER } from '@/common/resources';
import { ProductEntity } from '@/modules/products/entities/product.entity';
import { ProductFactory } from '@/modules/products/factory/products.factory';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

const productId1 = SEEDER.productId1;
const productId2 = SEEDER.productId2;
const productId3 = SEEDER.productId3;
const sellerId1 = SEEDER.sellerId1;
const sellerId2 = SEEDER.sellerId2;

export default class ProductsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ProductEntity);
    const baseProducts = [
      {
        id: productId1,
        seller_id: sellerId1,
        name: 'iPhone 15',
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
        id: productId2,
        seller_id: sellerId1,
        name: 'iPhone 14',
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
        id: productId3,
        seller_id: sellerId2,
        name: 'Surface Pro 8',
        cat_name: 'Laptop',
        desc: 'The latest Surface Pro',
        price: 3000,
        stock: 100,
        status: PRODUCT_STATUS.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      } as ProductEntity,
    ];
    const additionalProducts = ProductFactory.createMany(10000);
    await repository.insert([...baseProducts, ...additionalProducts]);
    console.log('ProductsSeeder done');
  }
}
