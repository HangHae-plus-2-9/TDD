import { Module } from '@nestjs/common';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

// @Module 데코레이터는 클래스를 NestJS 모듈로 선언합니다.
@Module({
  // imports 배열은 이 모듈에서 사용하거나 의존하는 다른 모듈을 지정합니다.
  imports: [
    // ConfigModule.forRoot 메서드를 사용해, 애플리케이션 전역에서 사용할 설정 모듈을 정의합니다.
    // 여기서는 .env 파일을 로드하여 환경 변수에 액세스 할 수 있게 합니다.
    ConfigModule.forRoot({
      // envFilePath는 환경변수가 정의된 파일의 경로를 지정합니다.
      // 여기서는 NODE_ENV 값을 기반으로 적절한 .env 파일을 사용합니다.
      envFilePath: `.env.${process.env.NODE_ENV}`,
      // isGlobal은 다른 모듈에서 ConfigModule을 임포트하지 않고도 환경변수를 사용할 수 있게 합니다.
      isGlobal: true,
    }),
    // 다음 모듈들은 애플리케이션의 다른 부분에서 사용되며, AppModule에서 의존성으로써 불러와집니다.
    DatabaseModule,
    HealthCheckModule,
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
})
// AppModule 클래스는 애플리케이션의 루트 모듈로, 다른 모듈들을 불러오고, 앱의 기반을 형성합니다.
export class AppModule {}
