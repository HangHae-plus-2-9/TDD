// 필요한 모듈과 타입을 임포트합니다.
import { ROLE_TYPE, TOKEN_TYPE, messages } from '@/common/resources';
import { required } from '@/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // 비밀번호 해싱을 위한 라이브러리입니다.
import { TokenPayloadDto } from './dto/token-payload.dto';
import { toSeconds } from '@/common/utils'; // 시간 단위 변환 유틸리티를 임포트합니다.
import { AccessTokenPayload } from './dto/access-token-payload.dto';

// 서비스 클래스를 정의하고, NestJS의 의존성 주입 시스템에 등록합니다.
@Injectable()
export class AuthService {
  // 생성자를 정의하고, 필요한 서비스를 주입받습니다.
  constructor(private jwtService: JwtService) {}

  // 비밀번호를 해시하는 메소드입니다.
  async hashPassword(password: string): Promise<string> {
    // bcrypt 라이브러리를 사용하여 비밀번호를 해시하고, 결과를 반환합니다.
    return await bcrypt.hash(password, 12);
  }

  // 입력받은 비밀번호와 해시된 비밀번호를 비교하는 메소드입니다.
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // bcrypt 라이브러리를 사용하여 비밀번호를 비교하고, 결과를 반환합니다.
    return await bcrypt.compare(password, hashedPassword);
  }

  // 액세스 토큰을 생성하는 메소드입니다.
  async createAccessToken(data: {
    role: ROLE_TYPE;
    userId: number;
  }): Promise<TokenPayloadDto> {
    // TokenPayloadDto 객체를 생성하고,
    // expiresIn은 환경 변수에서 읽어와 초 단위로 변환하며,
    // accessToken은 jwtService를 사용하여 서명하고 반환합니다.
    return new TokenPayloadDto({
      expiresIn: toSeconds(required('JWT_EXPIRES_IN') as string),
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TOKEN_TYPE.ACCESS_TOKEN,
        role: data.role,
      } as AccessTokenPayload),
    });
  }

  // 액세스 토큰을 검증하는 메소드입니다.
  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    try {
      // jwtService를 사용하여 토큰을 검증하고, 결과를 반환합니다.
      const result = await this.jwtService.verify(token);
      return result;
    } catch (err) {
      // 토큰 검증이 실패한 경우, UnauthorizedException 예외를 발생시킵니다.
      throw new UnauthorizedException(messages.UNAUTHORIZED_EXCEPTION);
    }
  }
}
