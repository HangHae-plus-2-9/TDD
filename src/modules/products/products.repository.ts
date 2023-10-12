import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseRepository } from '@/common/repositories/base.repository';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsRepository extends BaseRepository<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly model: Repository<ProductEntity>,
  ) {
    super(model);
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    console.log('createProductDto', createProductDto);
    return await this.model.save(createProductDto);
  }

  async all(): Promise<ProductEntity[]> {
    return await this.model.find();
  }

  async findById(id: number): Promise<ProductEntity> {
    return await this.model.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    const updatedProduct = await this.model.save({
      ...product,
      ...updateProductDto,
    });
    return updatedProduct;
  }

  async remove(id: number): Promise<ProductEntity> {
    const product = await this.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await this.model.remove(product);
    return product;
  }
}
