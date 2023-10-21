import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly model: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.model.save(user);
  }

  async findById(id: number): Promise<UserEntity> {
    if (!id) return null;
    return await this.model.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    if (!email) return null;
    return await this.model.findOne({
      where: { email },
    });
  }
}
