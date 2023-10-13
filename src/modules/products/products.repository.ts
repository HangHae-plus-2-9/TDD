import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductModel } from './models/product.model';
import { PaginatedResult } from '@/common/interfaces/paginated-result.interface';

@Injectable()
export class ProductsRepository {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    @InjectRepository(ProductEntity)
    private readonly model: Repository<ProductEntity>,
  ) {}

  async create(productModel: ProductModel): Promise<ProductModel> {
    const newProduct = await this.model.save(productModel.toEntity());
    return newProduct.toModel();
  }

  async all(filters: any = {}): Promise<PaginatedResult<ProductModel>> {
    console.log(filters);
    const { searchText, startDate, endDate, perPage, page, orderBy, isDesc } =
      filters;
    const query = this.model.createQueryBuilder('product');
    try {
      if (searchText) {
        query
          .orWhere('product.name like :searchText', {
            searchText: `%${searchText}%`,
          })
          .orWhere('product.category_name like :searchText', {
            searchText: `%${searchText}%`,
          })
          .orWhere('product.description like :searchText', {
            searchText: `%${searchText}%`,
          });
      }
      if (startDate) {
        query.andWhere('product.created_at >= :startDate', {
          startDate,
        });
      }
      if (endDate) {
        query.andWhere('product.created_at <= :endDate', {
          endDate,
        });
      }
      if (orderBy) {
        query.orderBy(`product.${orderBy}`, isDesc ? 'DESC' : 'ASC');
      } else {
        query.orderBy('product.created_at', 'DESC');
      }
      if (perPage && page) {
        query.skip((page - 1) * perPage).take(perPage);
      }
      const total = await query.getCount();
      const data = await query.getMany();
      return {
        total,
        data: data.map((product) => product.toModel()),
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
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
