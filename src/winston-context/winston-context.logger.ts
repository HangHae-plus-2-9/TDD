import { Injectable, Logger } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class WinstonContextLogger {
  constructor(
    private readonly logger: Logger,
    private readonly als: AsyncLocalStorage<any>,
  ) {}

  log(message: any) {
    this.logger.log({ message, alsCtx: this.als.getStore() });
  }

  debug(message: any) {
    this.logger.debug({ message, alsCtx: this.als.getStore() });
  }

  error(message: any) {
    this.logger.error({ message, alsCtx: this.als.getStore() });
  }

  warn(message: any) {
    this.logger.warn({ message, alsCtx: this.als.getStore() });
  }

  verbose(message: any) {
    this.logger.verbose({ message, alsCtx: this.als.getStore() });
  }
}
