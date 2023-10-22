import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { databaseConfig } from '@/config/database.config';
import {
  initializeTransactionalContext,
  addTransactionalDataSource,
  StorageDriver,
} from 'typeorm-transactional';

config({ path: '.env.development' });

const dataSource = new DataSource(
  databaseConfig() as any, //
);

initializeTransactionalContext({
  storageDriver: StorageDriver.ASYNC_LOCAL_STORAGE,
});
addTransactionalDataSource(dataSource);

export default dataSource;
