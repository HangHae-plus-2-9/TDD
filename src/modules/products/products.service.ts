import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    return await this.repo.create(createProductDto);
  }

  async findAll() {
    return await this.repo.all();
  }

  async findOne(id: number) {
    return await this.repo.findById(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.repo.update(id, updateProductDto);
  }

  async remove(id: number) {
    return await this.repo.remove(id);
  }
}
