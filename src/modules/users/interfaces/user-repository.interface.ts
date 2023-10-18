import { BaseRepositoryInterface } from '@/common/repositories/base.repository.interface';
import { UserEntity } from '../entities/user.entity';

export interface UsersRepositoryInterface
  extends BaseRepositoryInterface<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
}
