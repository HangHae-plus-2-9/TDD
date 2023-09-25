import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseRepository } from '@/common/repositories/base.repository';
import { ProductsRepositoryInterface } from './interfaces/product-repository.interface';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsRepository
  extends BaseRepository<ProductEntity>
  implements ProductsRepositoryInterface
{
  constructor(
    @InjectRepository(ProductEntity)
    private readonly model: Repository<ProductEntity>,
  ) {
    super(model);
  }

  doSomethingForProduct(): void {
    throw new Error('Method not implemented.');
  }

  create(createProductDto: CreateProductDto): any {
    console.log(createProductDto);
    return 'product created';
  }

  all(): any {
    return 'all products';
  }

  findById(id: number): any {
    return `product with id: ${id}`;
  }

  update(id: number, updateProductDto: UpdateProductDto): any {
    console.log(updateProductDto);
    return `product updated with id: ${id}`;
  }

  remove(id: number): any {
    return `product deleted with id: ${id}`;
  }
}
