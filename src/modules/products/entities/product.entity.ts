import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends CommonColumns {
  // @ManyToOne(() => UserEntity, (seller) => seller.products)
  // @JoinColumn({ name: 'seller_id' }) // This sets up the foreign key
  // @Column()
  // seller: UserEntity;

  @Column()
  name: string;

  // @Column()
  // price: string;

  // @Column()
  // quantity: number;

  // @Column({ nullable: true })
  // description?: string;
}
