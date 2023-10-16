import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductSpec } from './models/product-spec.model';
import { ProductMapper } from './mappers/product.mapper';
import { ProductModel } from './models/product.model';
import { PRODUCT_STATUS } from '@/common/resources';
import { ProductSpecWithStatus } from './models/product-spec-status.model';
import { ProductNotFoundException } from '@/common/exceptions';

const SELLERS = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Microsoft' },
];
const PRODUCTS: ProductEntity[] = [
  {
    id: 1,
    seller_id: 1,
    name: 'iPhone 12',
    cat_name: 'Smartphone',
    desc: 'The latest iPhone',
    price: 1000,
    stock: 100,
    status: PRODUCT_STATUS.ACTIVE,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  } as ProductEntity,
];

@Injectable()
export class ProductsRepository {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
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
    const seller = SELLERS.find((seller) => seller.id === sellerId);

    const productEntity = {
      ...productSpecWithStatus,
      seller_id: seller.id,
    } as ProductEntity;

    PRODUCTS.push(productEntity);

    return ProductMapper.toModel(productEntity);
  }

  async all(): Promise<ProductModel[]> {
    return PRODUCTS.map((product) => ProductMapper.toModel(product));
  }

  async findById(id: number): Promise<ProductModel> {
    const product = PRODUCTS.find((product) => product.id === id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    return ProductMapper.toModel(product);
  }

  async update(
    id: number,
    updatedProductSpec: Partial<ProductSpec>,
  ): Promise<ProductModel> {
    let product = PRODUCTS.find((product) => product.id === id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    product = {
      ...product,
      ...updatedProductSpec,
    } as ProductEntity;
    return ProductMapper.toModel(product);
  }

  async remove(id: number): Promise<ProductModel> {
    const product = PRODUCTS.find((product) => product.id === id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    PRODUCTS.filter((product) => product.id !== id);
    return ProductMapper.toModel(product);
  }
}
