// 필요한 모듈들을 임포트합니다.
import { Module } from '@nestjs/common'; // NestJS의 모듈 데코레이터 및 클래스를 임포트합니다.
import { AuthService } from './auth.service'; // 인증 서비스를 임포트합니다.
import { PassportModule } from '@nestjs/passport'; // Passport 모듈을 임포트합니다.
import { ConfigService } from '@nestjs/config'; // ConfigService를 임포트합니다.
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'; // JWT 모듈 및 옵션 타입을 임포트합니다.
import { authConfig } from '@/config'; // authConfig 함수를 임포트합니다.

// AuthModule 정의를 위한 데코레이터입니다.
@Module({
  imports: [
    // 이 모듈에서 사용하는 다른 모듈들입니다.
    PassportModule.register({
      // PassportModule을 설정하고 등록합니다.
      defaultStrategy: 'jwt', // 기본 인증 전략을 'jwt'로 설정합니다.
    }),
    JwtModule.registerAsync({
      // JwtModule을 비동기 방식으로 설정하고 등록합니다.
      useFactory: (config: ConfigService): JwtModuleOptions =>
        authConfig(config), // ConfigService를 이용하여 JWT 모듈 옵션을 설정합니다.
      inject: [ConfigService], // useFactory 함수에서 사용할 제공자를 주입합니다.
    }),
  ],
  providers: [AuthService], // 이 모듈에 등록된 서비스입니다.
  exports: [AuthService], // 이 모듈에서 내보낼 서비스입니다.
})
// AuthModule 클래스를 정의합니다. 이 클래스는 위에서 정의된 설정을 이용합니다.
export class AuthModule {}
