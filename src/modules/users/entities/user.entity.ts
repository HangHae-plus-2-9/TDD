import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends CommonColumns {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  email_verified_at: Date;

  @Column()
  phone: string;

  @Column()
  status: boolean;
}
