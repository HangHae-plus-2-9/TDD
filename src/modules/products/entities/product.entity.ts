import { CommonColumns } from '@/common/entities/common-columns';
import { SellerEntity } from '@/modules/users/entities/seller.entity';
import { Column, Entity } from 'typeorm';

export interface Product {
  id: number;
  seller: SellerEntity | number;
  name: string;
  product_type: string;
  category_name: string;
  option: string;
  description: string;
  price: string;
  quantity: number;
}

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
