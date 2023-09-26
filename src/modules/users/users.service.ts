import {
  Inject,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepositoryInterface } from './interfaces/user-repository.interface';
import { messages } from '@/common/resources';
import { UserEntity } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService,
    @Inject('UsersRepositoryInterface')
    private readonly repo: UsersRepositoryInterface,
  ) {}

  async register({ name, email, password }: CreateUserDto) {
    try {
      const emailExists = await this.checkEmailExist(email);
      if (emailExists) {
        throw new UnprocessableEntityException(
          messages.USER_ALREADY_EXISTS_EXCEPTION,
        );
      }
      const user = await this.saveUser(name, email, password);
      return user;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async login() {
    return 'This action login a user';
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async checkEmailExist(email: string): Promise<boolean> {
    try {
      const user = await this.repo.findByEmail(email);
      return user !== null;
    } catch (err) {
      this.logger.error(err);
      throw new UnprocessableEntityException(
        messages.UNPROCESSABLE_ENTITY_EXCEPTION,
      );
    }
  }

  private async saveUser(name: string, email: string, password: string) {
    try {
      console.log('saveUser1');
      const user = UserEntity.create({
        name,
        email,
        password: await this.authService.hashPassword(password),
      });
      console.log('saveUser2');
      await this.repo.create(user);
      console.log('saveUser3');
      return user.toUserWithoutPassword();
    } catch (err) {
      this.logger.error(err);
      throw new UnprocessableEntityException(
        messages.USER_REGISTER_FAILED_EXCEPTION,
      );
    }
  }
}
