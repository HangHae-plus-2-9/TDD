import { databaseConfig } from '@/config/database.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// @Module 데코레이터는 이 클래스가 모듈임을 NestJS에 알립니다.
@Module({
  // imports 배열은 이 모듈에서 사용하고자 하는 다른 모듈을 명시합니다.
  imports: [
    // TypeOrmModule.forRootAsync는 데이터베이스 연결을 비동기적으로 생성하도록 도와줍니다.
    TypeOrmModule.forRootAsync({
      // useFactory는 모듈의 동적 데이터를 제공합니다. 여기서는 databaseConfig 함수를 제공하여
      // 데이터베이스 설정을 동적으로 로드하고 있습니다.
      useFactory: databaseConfig,
    }),
  ],
})
// DatabaseModule 클래스를 내보냄으로써, 다른 모듈에서 이를 임포트하여 사용할 수 있게 합니다.
export class DatabaseModule {}
