import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '@/modules/users/entities/user.entity';

@Entity('sellers')
export class SellerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'business_num' })
  businessNum: string;

  @Column({ name: 'store_name' })
  storeName: string;

  @Column({ name: 'account_num' })
  accountNum: string;
}
