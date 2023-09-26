import { BaseRepository } from '@/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersRepositoryInterface } from './interfaces/user-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository
  extends BaseRepository<UserEntity>
  implements UsersRepositoryInterface
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly model: Repository<UserEntity>,
  ) {
    super(model);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.model.findOne({
      where: { email },
    });
  }
}
