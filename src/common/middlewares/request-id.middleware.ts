import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AsyncLocalStorage } from 'async_hooks';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(private readonly als: AsyncLocalStorage<any>) {}

  use(req: Request, res: Response, next: NextFunction) {
    const nestReqId = uuidv4() as string;
    req.headers['request-id'] = nestReqId;
    const store = {
      nestReqId,
    };
    this.als.run(store, () => next());
  }
}
