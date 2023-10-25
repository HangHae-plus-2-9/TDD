import { faker } from '@faker-js/faker';
import { ProductEntity } from '../entities/product.entity';
import { PRODUCT_STATUS, SEEDER } from '@/common/resources';
import { v4 as uuidv4 } from 'uuid';
import { ceil } from 'lodash';

export class ProductFactory {
  static create(): ProductEntity {
    const product = {
      id: uuidv4(),
      seller_id: SEEDER.sellerId3,
      name: faker.commerce.productName(),
      cat_name: faker.commerce.department(),
      desc: faker.commerce.productDescription(),
      price: ceil(Math.random() * 100) * 1000,
      stock: ceil(Math.random() * 1000),
      status: [PRODUCT_STATUS.ACTIVE, PRODUCT_STATUS.INACTIVE][
        Math.floor(Math.random() * 2)
      ],
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    } as ProductEntity;
    return product;
  }

  static createMany(amount: number): ProductEntity[] {
    return Array(amount)
      .fill(null)
      .map(() => ProductFactory.create());
  }
}
