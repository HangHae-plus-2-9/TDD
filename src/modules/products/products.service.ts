import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: ProductsRepository,
  ) {}

  create(createProductDto: CreateProductDto) {
    return true;
  }

  findAll() {
    return this.repo.all();
  }

  findOne(id: number) {
    return this.repo.findById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.repo.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
