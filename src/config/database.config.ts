import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { required } from '.';

// RDS Postgres SSL 설정때문에 추가
// GITHUB_ACTIONS 환경변수는 Github Actions에서만 사용되는 환경변수. 해결방법 찾아야 할듯.
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isProduction = process.env.NODE_ENV === 'production';

export const databaseConfig = (
  config?: ConfigService,
): TypeOrmModuleOptions => ({
  type: required('DATABASE_CONNECTION', config, 'postgres') as any,
  host: required('DATABASE_HOST', config, 'postgres') as string,
  port: parseInt(required('DATABASE_PORT', config, '5432') as string),
  username: required('DATABASE_USERNAME', config, 'postgres') as string,
  password: required('DATABASE_PASSWORD', config, 'postgres') as string,
  database: required('DATABASE_NAME', config, 'postgres') as string,
  synchronize: required('DATABASE_SYNCHRONIZE', config, false) as boolean,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/**migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  extra:
    isProduction || isGithubActions
      ? {
          ssl: { rejectUnauthorized: false },
        }
      : undefined,
});
