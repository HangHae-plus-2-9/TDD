import { ProductSpecWithStatus } from './product-spec-status.model';

export interface ProductModel extends ProductSpecWithStatus {
  id: number;
  sellerId: number;
}
