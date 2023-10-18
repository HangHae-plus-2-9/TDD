import { snakeCase } from 'lodash';
import { ProductEntity } from '../entities/product.entity';
import { ProductSpec } from '../models/product-spec.model';
import { ProductModel } from '../models/product.model';

export class ProductMapper {
  static toModel(entity: ProductEntity): ProductModel {
    return {
      ...entity,
    };
  }
}

export function dtoToSpec(dto: any): ProductSpec {
  const result = {};
  for (const [key, value] of Object.entries(dto)) {
    if (value !== undefined) {
      result[snakeCase(key)] = value;
    }
  }
  return result as ProductSpec;
}
