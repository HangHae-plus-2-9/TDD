import { BaseRepositoryInterface } from '@/common/repositories/base.repository.interface';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export interface ProductsRepositoryInterface
  extends BaseRepositoryInterface<ProductEntity> {
  doSomethingForProduct(): void;

  create(createProductDto: CreateProductDto): any;

  all(): any;

  findById(id: number): any;

  update(id: number, updateProductDto: UpdateProductDto): any;

  remove(id: number): any;
}
