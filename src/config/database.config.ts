import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// RDS Postgres SSL 설정때문에 추가
// GITHUB_ACTIONS 환경변수는 Github Actions에서만 사용되는 환경변수. 해결방법 찾아야 할듯.
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isProduction = process.env.NODE_ENV === 'production';

export default (): TypeOrmModuleOptions => ({
  type: process.env.DATABASE_CONNECTION as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
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
