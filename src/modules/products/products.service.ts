import {
  Inject,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepositoryInterface } from './interfaces/product-repository.interface';
import { ProductEntity } from './entities/product.entity';
import { messages } from '@/common/resources';

@Injectable()
export class ProductsService {
  comp: any;
  constructor(
    private readonly logger: Logger,
    // private readonly comp: ProductsComponent,
    @Inject('ProductsRepositoryInterface')
    private readonly repo: ProductsRepositoryInterface,
  ) {}

  async upload(createProductDto: CreateProductDto) {
    try {
      const product = await this.saveProduct(createProductDto);
      console.log(product);
      return product;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  findAll() {
    return this.repo.all();
  }

  findOne(id: number) {
    return this.repo.findById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.repo.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }

  async saveProduct(createProductDto: CreateProductDto) {
    try {
      const product = ProductEntity.create({
        seller: createProductDto.seller,
        name: createProductDto.name,
        product_type: createProductDto.product_type,
        category_name: createProductDto.category_name,
        option: createProductDto.option,
        description: createProductDto.description,
        price: createProductDto.price,
        quantity: createProductDto.quantity,
      });
      console.log('product', product);
      await this.repo.create(product);
      return product.toProduct();
    } catch (err) {
      this.logger.error;
      throw new UnprocessableEntityException(
        messages.UNPROCESSABLE_ENTITY_EXCEPTION,
      );
    }
  }
}
