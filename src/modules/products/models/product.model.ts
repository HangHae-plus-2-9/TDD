import { removeUndefinedKeys } from '@/common/utils';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductModel {
  id?: number;
  seller_id: number;
  name: string;
  category_name: string;
  description: string;
  price: number;
  stock: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;

  toEntity() {
    const entity = new ProductEntity();
    entity.seller_id = this.seller_id;
    entity.name = this.name;
    entity.category_name = this.category_name;
    entity.description = this.description;
    entity.price = this.price;
    entity.stock = this.stock;
    return removeUndefinedKeys(entity) as ProductEntity;
  }

  static fromDto(dto: CreateProductDto | UpdateProductDto) {
    const model = new ProductModel();
    model.seller_id = dto.sellerId;
    model.name = dto.name;
    model.category_name = dto.categoryName;
    model.description = dto.description;
    model.price = dto.price;
    model.stock = dto.stock;
    return removeUndefinedKeys(model) as ProductModel;
  }
}
