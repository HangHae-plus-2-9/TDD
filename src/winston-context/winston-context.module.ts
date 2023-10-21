import { AlsModule } from '@/als/als.module';
import { Global, Logger, Module } from '@nestjs/common';
import { WinstonContextLogger } from './winston-context.logger';

@Global()
@Module({
  imports: [AlsModule],
  providers: [Logger, WinstonContextLogger],
  exports: [WinstonContextLogger],
})
export class WinstonContextModule {}
