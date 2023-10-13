import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductModel } from './models/product.model';
import { ProductNotFoundException } from '@/common/exceptions';
import { IndexProductDto } from './dto/index-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductsRepository) {}

  async create(productModel: ProductModel) {
    return await this.repo.create(productModel);
  }

  async findAll(indexProductDto: IndexProductDto) {
    const { page, perPage } = indexProductDto;
    const { total, data } = await await this.repo.all(indexProductDto);
    return {
      total,
      data,
      current_page: page,
      from: (page - 1) * perPage + 1,
      to: (page - 1) * perPage + perPage,
      last_page: Math.ceil(total / perPage),
      per_page: perPage,
    };
  }

  async findOne(id: number) {
    return await this.repo.findById(id);
  }

  async update(id: number, productModel: Partial<ProductModel>) {
    const product = await this.repo.findById(id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    return await this.repo.update(id, productModel);
  }

  async remove(id: number) {
    const product = await this.repo.findById(id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    return await this.repo.remove(id);
  }
}
