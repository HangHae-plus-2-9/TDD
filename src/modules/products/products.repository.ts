import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductSpec } from './models/product-spec.model';
import {
  ProductMapper,
  productEntityToModel,
  productModelToEntity,
} from './mappers/product.mapper';
import { ProductModel } from './models/product.model';
import { ProductSpecWithStatus } from './models/product-spec-status.model';
import { ProductNotFoundException } from '@/common/exceptions';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';

type Seller = {
  id: number;
  name: string;
};
const SELLERS = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Microsoft' },
];

@Injectable()
export class ProductsRepository {
  constructor(
    private readonly cLogger: WinstonContextLogger,
    @InjectRepository(ProductEntity)
    private readonly model: Repository<ProductEntity>,
  ) {}

  async getBySellerId(sellerId: number): Promise<any> {
    const seller = SELLERS.find((seller) => seller.id === sellerId);
    if (!seller) {
      throw new Error('Seller not found');
    }
    return seller;
  }

  async create(
    sellerId: number,
    productSpecWithStatus: ProductSpecWithStatus,
  ): Promise<ProductModel> {
    const seller = SELLERS.find((seller) => seller.id === sellerId) as Seller;
    if (!seller) {
      throw new Error('Seller not found');
    }
    const productModel = {
      id: null,
      ...productSpecWithStatus,
      sellerId,
    } as unknown as ProductModel;
    const productEntity = productModelToEntity(productModel);

    return productEntityToModel(await this.model.save(productEntity));
  }

  async all(): Promise<ProductModel[]> {
    return (await this.model.find()).map((item) => ProductMapper.toModel(item));
  }

  async getByProductId(id: number): Promise<ProductModel> {
    const product = await this.model.findOne({
      where: { id },
    });
    if (!product) {
      throw new ProductNotFoundException();
    }
    return ProductMapper.toModel(product);
  }

  async update(
    id: number,
    updatedProductSpec: Partial<ProductSpec>,
  ): Promise<ProductModel> {
    let productEntity = await this.model.findOne({
      where: { id },
    });
    if (!productEntity) {
      throw new ProductNotFoundException();
    }
    productEntity = {
      ...productEntity,
      ...updatedProductSpec,
    } as ProductEntity;

    return productEntityToModel(await this.model.save(productEntity));
  }

  async remove(id: number): Promise<ProductModel> {
    const productEntity = await this.model.findOne({
      where: { id },
    });
    if (!productEntity) {
      throw new ProductNotFoundException();
    }
    return productEntityToModel(await this.model.remove(productEntity));
  }
}
