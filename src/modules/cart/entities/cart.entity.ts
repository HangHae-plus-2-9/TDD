import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonColumns } from '@/common/entities/common-columns';

export interface Cart {
  id: number;
  customer_id: number;
}

@Entity('cart')
export class CartEntity extends CommonColumns {
  @Column({ type: 'int', nullable: false })
  // @OneToOne(() => Customer)
  customer_id: number;

  public toCart(): Cart {
    const { id, customer_id } = this;
    return { id, customer_id };
  }
}
