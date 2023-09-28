import { ROLE_TYPE, TOKEN_TYPE, messages } from '@/common/resources';
import { required } from '@/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { toSeconds } from '@/common/utils';
import { AccessTokenPayload } from './dto/access-token-payload.dto';

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
      } as AccessTokenPayload),
    });
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    try {
      const result = await this.jwtService.verify(token);
      return result;
    } catch (err) {
      throw new UnauthorizedException(messages.UNAUTHORIZED_EXCEPTION);
    }
  }
}
