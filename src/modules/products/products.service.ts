import { Injectable, Logger } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductSpec } from './models/product-spec.model';
import { PRODUCT_STATUS } from '@/common/resources';

@Injectable()
export class ProductsService {
  constructor(
    private readonly logger: Logger,
    private readonly repo: ProductsRepository,
  ) {}

  async create(sellerId: number, productSpec: ProductSpec) {
    try {
      const productSpecWithStatus = {
        ...productSpec,
        status: PRODUCT_STATUS.PENDING,
      };
      return await this.repo.create(sellerId, productSpecWithStatus);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.repo.all();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findOne(id: number) {
    try {
      return await this.repo.findById(id);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async update(id: number, productSpec: Partial<ProductSpec>) {
    try {
      return await this.repo.update(id, productSpec);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async remove(id: number) {
    try {
      return await this.repo.remove(id);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
