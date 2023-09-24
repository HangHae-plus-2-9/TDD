import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import databaseConfig from '@/config/database.config';

config({ path: '.env.development' });

export default new DataSource(
  databaseConfig() as any, //
);
