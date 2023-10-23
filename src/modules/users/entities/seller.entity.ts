import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from '@/modules/products/entities/product.entity';

export interface SellerWithoutPassword {
  id: string;
  business_num: string;
  store_name: string;
  account_num: string;
}

@Entity('sellers')
export class SellerEntity extends CommonColumns {
  @Column({ type: 'int', nullable: false })
  @OneToOne(() => UserEntity, (user: UserEntity) => user.id)
  user_id: string;

  @Column()
  business_num: string;

  @Column()
  store_name: string;

  @Column()
  account_num: string;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.id)
  products: ProductEntity[];

  public toUserWithoutPassword(): SellerWithoutPassword {
    const { id, business_num, store_name, account_num } = this;
    return { id, business_num, store_name, account_num };
  }
}
