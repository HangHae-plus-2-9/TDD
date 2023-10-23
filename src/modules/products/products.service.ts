import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductSpec } from './models/product-spec.model';
import { ProductModel } from './models/product.model';
import { ProductNotFoundException } from '@/common/exceptions';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { v4 as uuidv4 } from 'uuid';
import { PRODUCT_STATUS } from '@/common/resources';

@Injectable()
export class ProductsService {
  constructor(
    private readonly cLogger: WinstonContextLogger,
    private readonly repo: ProductsRepository,
  ) {}

  async create(
    sellerId: string,
    productSpec: ProductSpec,
  ): Promise<ProductModel> {
    // const seller = await this.sellerService.getBySellerId(sellerId);
    // if (!seller) {
    //   throw new Error('Seller not found');
    // }
    const productModel = {
      id: uuidv4(),
      ...productSpec,
      sellerId,
      status: PRODUCT_STATUS.PENDING,
    } as ProductModel;
    return await this.repo.create(productModel);
  }

  async findAll(): Promise<ProductModel[]> {
    return await this.repo.all();
  }

  async findOne(id: string): Promise<ProductModel> {
    return await this.repo.getByProductId(id);
  }

  async update(
    id: string,
    productSpec: Partial<ProductSpec>,
  ): Promise<ProductModel> {
    return await this.repo.update(id, productSpec);
  }

  async remove(id: string): Promise<ProductModel> {
    return await this.repo.remove(id);
  }

  async subStock(productId: string, quantity: number): Promise<ProductModel> {
    const productModel = await this.repo.getByProductId(productId);
    if (!productModel) throw new ProductNotFoundException();
    if (productModel.stock < quantity) throw new Error('재고가 부족합니다.');
    const updatedProductModel = {
      ...productModel,
      stock: productModel.stock - quantity,
    };
    return await this.repo.update(productId, updatedProductModel);
  }

  async addStock(productId: string, quantity: number): Promise<ProductModel> {
    return await this.subStock(productId, -quantity);
  }
}
