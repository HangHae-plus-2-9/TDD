import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductSpec } from './models/product-spec.model';
import { PRODUCT_STATUS } from '@/common/resources';
import { ProductModel } from './models/product.model';
import { ProductNotFoundException } from '@/common/exceptions';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';

@Injectable()
export class ProductsService {
  constructor(
    private readonly cLogger: WinstonContextLogger,
    private readonly repo: ProductsRepository,
  ) {}

  async create(
    sellerId: number,
    productSpec: ProductSpec,
  ): Promise<ProductModel> {
    try {
      const productSpecWithStatus = {
        ...productSpec,
        status: PRODUCT_STATUS.PENDING,
      };
      return await this.repo.create(sellerId, productSpecWithStatus);
    } catch (err) {
      this.cLogger.error(err);
      throw err;
    }
  }

  async findAll(): Promise<ProductModel[]> {
    try {
      return await this.repo.all();
    } catch (err) {
      this.cLogger.error(err);
      throw err;
    }
  }

  async findOne(id: number): Promise<ProductModel> {
    try {
      return await this.repo.getByProductId(id);
    } catch (err) {
      this.cLogger.error(err);
      throw err;
    }
  }

  async update(
    id: number,
    productSpec: Partial<ProductSpec>,
  ): Promise<ProductModel> {
    try {
      return await this.repo.update(id, productSpec);
    } catch (err) {
      this.cLogger.error(err);
      throw err;
    }
  }

  async remove(id: number): Promise<ProductModel> {
    try {
      return await this.repo.remove(id);
    } catch (err) {
      this.cLogger.error(err);
      throw err;
    }
  }

  async subStock(productId: number, quantity: number): Promise<ProductModel> {
    try {
      const productModel = await this.repo.getByProductId(productId);
      if (!productModel) throw new ProductNotFoundException();
      if (productModel.stock < quantity) throw new Error('재고가 부족합니다.');
      const updatedProductModel = {
        ...productModel,
        stock: productModel.stock - quantity,
      };
      return await this.repo.update(productId, updatedProductModel);
    } catch (err) {
      this.cLogger.error(err);
      throw err;
    }
  }

  async addStock(productId: number, quantity: number): Promise<ProductModel> {
    return await this.subStock(productId, -quantity);
  }
}
