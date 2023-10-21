import { ProductEntity } from '../entities/product.entity';
import { ProductSpec } from '../models/product-spec.model';
import { ProductModel } from '../models/product.model';

export class ProductMapper {
  static toModel(entity: ProductEntity): ProductModel {
    return {
      id: entity.id,
      name: entity.name,
      catName: entity.cat_name,
      desc: entity.desc,
      price: entity.price,
      stock: entity.stock,
      status: entity.status,
      sellerId: entity.seller_id,
    };
  }
}

export function dtoToSpec(dto: any): ProductSpec {
  const result = {};
  for (const [key, value] of Object.entries(dto)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as ProductSpec;
}

export const productModelToEntity = (model: ProductModel): ProductEntity => {
  return {
    id: model.id,
    name: model.name,
    cat_name: model.catName,
    desc: model.desc,
    price: model.price,
    stock: model.stock,
    status: model.status,
    seller_id: model.sellerId,
  } as ProductEntity;
};

export const productEntityToModel = (entity: ProductEntity): ProductModel => {
  return {
    id: entity.id,
    name: entity.name,
    catName: entity.cat_name,
    desc: entity.desc,
    price: entity.price,
    stock: entity.stock,
    status: entity.status,
    sellerId: entity.seller_id,
  } as ProductModel;
};
