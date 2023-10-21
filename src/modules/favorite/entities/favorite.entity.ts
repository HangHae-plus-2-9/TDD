import { Column, Entity } from 'typeorm';
import { CommonColumns } from '@/common/entities/common-columns';

export interface Favorite {
  id: number;
  user_id: number;
  product_id: number;
}

@Entity('favorites')
export class FavoriteEntity extends CommonColumns {
  @Column({ type: 'int', nullable: true })
  user_id: number;
  @Column({ type: 'int', nullable: true })
  product_id: number;

  public toFavorite(): Favorite {
    const { id, user_id, product_id } = this;
    return { id, user_id, product_id };
  }
}
