import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonColumns } from '@/common/entities/common-columns';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { ProductEntity } from '@/modules/products/entities/product.entity';

export interface Favorite {
  id: number;
  user_id: number;
  product_id: number;
}

@Entity('favorites')
export class FavoriteEntity extends CommonColumns {
  @Column({ type: 'int', nullable: false })
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.id)
  user_id: number;

  @Column({ type: 'int', nullable: false })
  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.id)
  product_id: number;

  public toFavorite(): Favorite {
    const { id, user_id, product_id } = this;
    return { id, user_id, product_id };
  }
}
