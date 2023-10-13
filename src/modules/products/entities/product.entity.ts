import { CommonColumns } from '@/common/entities/common-columns';
import { SellerEntity } from '@/modules/users/entities/seller.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

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

@Entity({ name: 'product' })
export class ProductEntity extends CommonColumns {
  @ManyToOne(() => SellerEntity, (seller: SellerEntity) => seller.products)
  seller: SellerEntity | number;

  @Column()
  name: string;

  @Column()
  product_type: string;

  @Column()
  category_name: string;

  @Column()
  option: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  quantity: number;

  public toProduct(): Product {
    const {
      id,
      seller,
      name,
      product_type,
      category_name,
      option,
      description,
      price,
      quantity,
    } = this;
    return {
      id,
      seller,
      name,
      product_type,
      category_name,
      option,
      description,
      price,
      quantity,
    };
  }
}
