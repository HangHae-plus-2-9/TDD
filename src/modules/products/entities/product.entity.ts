import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends CommonColumns {
  @Column()
  name: string;
}
