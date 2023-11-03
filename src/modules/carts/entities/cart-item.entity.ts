import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonColumns } from '@/common/entities/common-columns';
import { CartEntity } from './cart.entity';

export interface CartItem {
  id: string;
  cart_id: string;
  product: string;
  quantity: number;
}

@Entity('cart_items')
export class CartItemEntity extends CommonColumns {
  @Column({ type: 'int', nullable: false })
  @ManyToOne(() => CartEntity, (cart: CartEntity) => cart.id)
  cart_id: string;

  @Column({ nullable: false })
  product: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  public toCartItem(): CartItem {
    const { id, cart_id, product, quantity } = this;
    return { id, cart_id, product, quantity };
  }
}
