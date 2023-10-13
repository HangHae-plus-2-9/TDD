import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { ProductModel } from './models/product.model';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductsRepository) {}

  async create(productModel: ProductModel) {
    return await this.repo.create(productModel);
  }

  async findAll() {
    return await this.repo.all();
  }

  async findOne(id: number) {
    return await this.repo.findById(id);
  }

  async update(id: number, productModel: Partial<ProductModel>) {
    return await this.repo.update(id, productModel);
  }

  async remove(id: number) {
    return await this.repo.remove(id);
  }
}
