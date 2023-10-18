import { PRODUCT_STATUS } from '@/common/resources';
import { ProductSpec } from './product-spec.model';

export interface ProductSpecWithStatus extends ProductSpec {
  status: PRODUCT_STATUS;
}
