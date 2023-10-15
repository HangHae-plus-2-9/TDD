import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '@/modules/users/entities/user.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  name: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column()
  address1: string;

  @Column({ nullable: true })
  address2?: string;

  @Column({ nullable: true, name: 'address_detail' })
  addressDetail?: string;
}
