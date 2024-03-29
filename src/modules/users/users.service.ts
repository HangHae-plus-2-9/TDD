import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ROLE_TYPE, messages } from '@/common/resources';
import { UserEntity } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenPayloadDto } from '../auth/dto/token-payload.dto';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly cLogger: WinstonContextLogger,
    private readonly authService: AuthService,
    private readonly repo: UsersRepository,
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
      this.cLogger.error(err);
      throw err;
    }
  }

  async login({ email, password }: LoginUserDto): Promise<TokenPayloadDto> {
    try {
      const user = await this.repo.findByEmail(email);
      if (!user) {
        throw new UnprocessableEntityException(
          messages.USER_NOT_FOUND_EXCEPTION,
        );
      }

      const isPasswordValid = await this.authService.comparePasswords(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnprocessableEntityException(
          messages.USER_NOT_FOUND_EXCEPTION,
        );
      }

      const token = await this.authService.createAccessToken({
        role: ROLE_TYPE.ADMIN,
        userId: user.id,
      });
      return token;
    } catch (err) {
      this.cLogger.error(err);
      throw err;
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    try {
      const user = this.repo.findById(id);
      return user || [];
    } catch (err) {
      this.cLogger.error(err);
      throw err;
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  private async checkEmailExist(email: string): Promise<boolean> {
    try {
      const user = await this.repo.findByEmail(email);
      return user !== null;
    } catch (err) {
      this.cLogger.error(err);
      throw new UnprocessableEntityException(
        messages.UNPROCESSABLE_ENTITY_EXCEPTION,
      );
    }
  }

  private async saveUser(name: string, email: string, password: string) {
    try {
      const user = UserEntity.create({
        name,
        email,
        password: await this.authService.hashPassword(password),
      });
      await this.repo.create(user);
      return user.toUserWithoutPassword();
    } catch (err) {
      this.cLogger.error(err);
      throw new UnprocessableEntityException(
        messages.USER_REGISTER_FAILED_EXCEPTION,
      );
    }
  }
}
