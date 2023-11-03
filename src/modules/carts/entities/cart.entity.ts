import { Column, Entity } from 'typeorm';
import { CommonColumns } from '@/common/entities/common-columns';

export interface Cart {
  id: string;
  customer_id: string;
}

@Entity('carts')
export class CartEntity extends CommonColumns {
  @Column({ type: 'int', nullable: false })
  // @OneToOne(() => Customer)
  customer_id: string;

  public toCart(): Cart {
    const { id, customer_id } = this;
    return { id, customer_id };
  }
}
