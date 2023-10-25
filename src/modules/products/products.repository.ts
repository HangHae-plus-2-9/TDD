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
import { ProductNotFoundException } from '@/common/exceptions';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';

type Seller = {
  id: string;
  name: string;
};
const SELLERS = [
  { id: '4bbd014c-ff24-486f-852a-33f29d729dee', name: 'Apple' },
  { id: '0ecdc3a5-421e-4f21-ba1e-58024e4e85c3', name: 'Microsoft' },
];

@Injectable()
export class ProductsRepository {
  constructor(
    private readonly cLogger: WinstonContextLogger,
    @InjectRepository(ProductEntity)
    private readonly model: Repository<ProductEntity>,
  ) {}

  async getBySellerId(sellerId: string): Promise<any> {
    const seller = SELLERS.find((seller) => seller.id === sellerId);
    if (!seller) {
      throw new Error('Seller not found');
    }
    return seller;
  }

  async create(productModel: ProductModel): Promise<ProductModel> {
    const productEntity = productModelToEntity(productModel);

    return productEntityToModel(await this.model.save(productEntity));
  }

  async all(): Promise<ProductModel[]> {
    return (await this.model.find()).map((item) => ProductMapper.toModel(item));
  }

  async findAllWithSearchAndPagination(
    filters: any,
    page = 20,
    perPage = 1,
  ): Promise<PaginatedResult<ProductModel>> {
    const query = this.createQueryBuilder();
    const { searchText, startDate, endDate, orderBy, isDesc } = filters;
    if (searchText) {
      query
        .andWhere('product.name LIKE :searchText', {
          searchText: `%${searchText}%`,
        })
        .orWhere('product.desc LIKE :searchText', {
          searchText: `%${searchText}%`,
        })
        .orWhere('product.cat_name LIKE :searchText', {
          searchText: `%${searchText}%`,
        });
    }
    if (startDate) {
      query.andWhere('product.created_at >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('product.created_at <= :endDate', { endDate });
    }
    if (orderBy) {
      query.orderBy(`product.${orderBy}`, isDesc ? 'DESC' : 'ASC');
    } else {
      query.orderBy('product.id', 'DESC');
    }
    const [items, total] = await query
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();
    return {
      total: total,
      page: page,
      perPage: perPage,
      data: items.map((item) => ProductMapper.toModel(item)),
    };
  }

  async getByProductId(id: string): Promise<ProductModel> {
    const product = await this.model.findOne({
      where: { id },
    });
    if (!product) {
      throw new ProductNotFoundException();
    }
    return ProductMapper.toModel(product);
  }

  async update(
    id: string,
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

  async remove(id: string): Promise<ProductModel> {
    const productEntity = await this.model.findOne({
      where: { id },
    });
    if (!productEntity) {
      throw new ProductNotFoundException();
    }
    return productEntityToModel(await this.model.remove(productEntity));
  }

  private createQueryBuilder() {
    return this.model.createQueryBuilder('product');
  }
}
