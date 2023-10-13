import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CommonColumns } from '@/common/entities/common-columns';
import { CartEntity } from './cart.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { ProductEntity } from '@/modules/products/entities/product.entity';

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
}

@Entity('cart_items')
export class CartItemEntity extends CommonColumns {
  @Column({ type: 'int', nullable: false })
  @ManyToOne(() => CartEntity, (cart: CartEntity) => cart.id)
  cart_id: number;

  @Column({ type: 'int', nullable: false })
  @OneToOne(() => ProductEntity, (product: ProductEntity) => product.id)
  product_id: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  public toCartItem(): CartItem {
    const { id, cart_id, product_id, quantity } = this;
    return { id, cart_id, product_id, quantity };
  }
}
