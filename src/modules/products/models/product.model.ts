import { PRODUCT_STATUS } from '@/common/resources';
import { ProductSpec } from './product-spec.model';

export interface ProductModel extends ProductSpec {
  id: string;
  sellerId: string;
  status: PRODUCT_STATUS;
}
