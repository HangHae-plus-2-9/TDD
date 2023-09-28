import { BaseRepositoryInterface } from '@/common/repositories/base.repository.interface';
import { ProductEntity } from '../entities/product.entity';

export interface ProductsRepositoryInterface
  extends BaseRepositoryInterface<ProductEntity> {
  doSomethingForProduct(): void;
}
