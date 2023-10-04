import { ConfigService } from '@nestjs/config';
import { required } from './helpers';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

// 인증 설정을 반환하는 함수
// Function returning authentication configurations
export const authConfig = (config: ConfigService): JwtModuleAsyncOptions =>
  ({
    // 비밀 키(secret)를 환경 변수에서 가져오는 로직
    // Logic for getting the secret key from the environment variables
    secret: required('JWT_SECRET', config),

    // JWT 서명 옵션 설정
    // Setting the JWT signing options
    signOptions: {
      // 토큰 만료 시간을 환경 변수에서 가져오는 로직
      // Logic for getting the token expiration time from the environment variables
      expiresIn: required('JWT_EXPIRES_IN', config),
    },
  } as JwtModuleAsyncOptions);
