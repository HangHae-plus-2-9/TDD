import { CommonColumns } from '@/common/entities/common-columns';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('products')
export class ProductEntity extends CommonColumns {
  @PrimaryColumn()
  id: number;
}
