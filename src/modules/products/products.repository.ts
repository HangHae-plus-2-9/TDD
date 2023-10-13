import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductModel } from './models/product.model';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly model: Repository<ProductEntity>,
  ) {}

  async create(productModel: ProductModel): Promise<ProductModel> {
    const newProduct = await this.model.save(productModel.toEntity());
    return newProduct.toModel();
  }

  async all(): Promise<ProductModel[]> {
    const products = await this.model.find();
    return products.map((product) => product.toModel());
  }

  async findById(id: number): Promise<ProductModel> {
    const product = await this.model.findOne({ where: { id } });
    return product?.toModel();
  }

  async update(
    id: number,
    updatedProductModel: Partial<ProductModel>,
  ): Promise<any> {
    const productEntity = await this.model.findOne({ where: { id } });
    Object.assign(productEntity, updatedProductModel.toEntity());
    const updatedProduct = await this.model.save(productEntity);
    return updatedProduct.toModel();
  }

  async remove(id: number): Promise<ProductModel> {
    const product = await this.findById(id);
    const deletedProduct = await this.model.save({
      ...product,
      deleted_at: new Date(),
    });
    return deletedProduct.toModel();
  }
}
