import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { required } from '.';

// RDS Postgres SSL 설정때문에 추가
// GITHUB_ACTIONS 환경변수는 Github Actions에서만 사용되는 환경변수. 해결방법 찾아야 할듯.
// 추가적인 설명: RDS Postgres SSL 설정이 필요하기 때문에 이 부분을 추가했고,
// GITHUB_ACTIONS는 GitHub Actions 환경에서만 사용되는 환경 변수이다. 추후에 이 부분에 대한 해결책을 찾아야 할 수도 있다.
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isProduction = process.env.NODE_ENV === 'production';

// 데이터베이스 설정을 반환하는 함수
// Function returning database configurations
export const databaseConfig = (
  config?: ConfigService,
): TypeOrmModuleOptions => ({
  // 데이터베이스 타입을 환경 변수에서 가져오거나 기본값으로 'postgres'를 사용
  // Get database type from the environment variables or use 'postgres' as a default
  type: required('DATABASE_CONNECTION', config, 'postgres') as any,

  // 데이터베이스 호스트를 환경 변수에서 가져오거나 기본값으로 'postgres'를 사용
  // Get database host from the environment variables or use 'postgres' as a default
  host: required('DATABASE_HOST', config, 'postgres') as string,

  // 데이터베이스 포트를 환경 변수에서 가져오거나 기본값으로 5432를 사용
  // Get database port from the environment variables or use 5432 as a default
  port: parseInt(required('DATABASE_PORT', config, '5432') as string),

  // 데이터베이스 사용자 이름을 환경 변수에서 가져오거나 기본값으로 'postgres'를 사용
  // Get database username from the environment variables or use 'postgres' as a default
  username: required('DATABASE_USERNAME', config, 'postgres') as string,

  // 데이터베이스 비밀번호를 환경 변수에서 가져오거나 기본값으로 'postgres'를 사용
  // Get database password from the environment variables or use 'postgres' as a default
  password: required('DATABASE_PASSWORD', config, 'postgres') as string,

  // 사용할 데이터베이스 이름을 환경 변수에서 가져오거나 기본값으로 'postgres'를 사용
  // Get the name of the database to use from the environment variables or use 'postgres' as a default
  database: required('DATABASE_NAME', config, 'postgres') as string,

  // 데이터베이스 동기화 여부를 환경 변수에서 가져오거나 기본값으로 false를 사용
  // Get the database synchronization status from the environment variables or use false as a default
  synchronize: required('DATABASE_SYNCHRONIZE', config, false) as boolean,

  // 엔터티 파일들의 위치 지정
  // Specifying the location of the entity files
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  // 마이그레이션 파일들의 위치 지정
  // Specifying the location of the migration files
  migrations: [__dirname + '/../database/**migrations/*{.ts,.js}'],

  // 마이그레이션을 위한 테이블 이름 설정
  // Setting the table name for migrations
  migrationsTableName: 'migrations',

  // 프로덕션 환경이거나 Github Actions 환경인 경우 SSL 옵션을 설정
  // Set SSL options if it is a production environment or Github Actions environment
  extra:
    isProduction || isGithubActions
      ? {
          ssl: { rejectUnauthorized: false },
        }
      : undefined,
});
