import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { databaseConfig } from '@/config/database.config';

// '.env.development' 파일의 환경 변수를 로드합니다.
config({ path: '.env.development' });

// 새로운 데이터 소스를 생성하고, 이를 내보냅니다.
// databaseConfig() 함수를 이용하여 데이터베이스 설정을 정의합니다.
export default new DataSource(
  databaseConfig() as any, // 'databaseConfig()'의 반환 값을 DataSource의 인수로 전달합니다.
);
