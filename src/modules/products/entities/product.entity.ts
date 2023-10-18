import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends CommonColumns {
  @Column()
  seller_id: number;

  @Column()
  name: string;

  @Column()
  cat_name: string;

  @Column({ type: 'text' })
  desc: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  status: number;
}
