import { CommonColumns } from '@/common/entities/common-columns';
import { USER_STATUS } from '@/common/resources';
import { Column, Entity } from 'typeorm';

export interface UserWithoutPassword {
  id: string;
  name: string;
  email: string;
}

@Entity('users')
export class UserEntity extends CommonColumns {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email_verified_at: Date;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: USER_STATUS.PENDING })
  status: USER_STATUS;

  public toUserWithoutPassword(): UserWithoutPassword {
    const { id, name, email } = this;
    return { id, name, email };
  }
}
