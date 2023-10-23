import { Column, Entity } from 'typeorm';
import { CommonColumns } from '@/common/entities/common-columns';

export interface Favorite {
  id: string;
  user_id: string;
  product_id: string;
}

@Entity('favorites')
export class FavoriteEntity extends CommonColumns {
  @Column({ type: 'int', nullable: true })
  user_id: string;
  @Column({ type: 'int', nullable: true })
  product_id: string;

  public toFavorite(): Favorite {
    const { id, user_id, product_id } = this;
    return { id, user_id, product_id };
  }
}
