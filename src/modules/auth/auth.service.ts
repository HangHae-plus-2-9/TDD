import { ROLE_TYPE, TOKEN_TYPE, messages } from '@/common/resources';
import { required } from '@/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { toSeconds } from '@/common/utils';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async createAccessToken(data: {
    role: ROLE_TYPE;
    userId: number;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: toSeconds(required('JWT_EXPIRES_IN') as string),
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TOKEN_TYPE.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async verifyAccessToken(token: string): Promise<boolean> {
    try {
      const result = await this.jwtService.verify(token);
      return result;
    } catch (err) {
      throw new UnauthorizedException(messages.UNAUTHORIZED_EXCEPTION);
    }
  }
}
