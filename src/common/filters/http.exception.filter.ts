import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WinstonContextLogger)
    private readonly cLogger: WinstonContextLogger,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const errorReq = {
      body: req.body,
      query: req.query,
      params: req.params,
    };
    this.cLogger.error(
      `${req.method} ${req.url} \n ${exception.stack} \n ${JSON.stringify(
        errorReq,
      )}`,
    );

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    let message = exception.message;

    if (
      exception instanceof BadRequestException &&
      exception.getResponse() instanceof Object
    ) {
      const response = exception.getResponse() as Record<string, any>;
      if (response.message && typeof response.message === 'string') {
        message = response.message;
      } else if (response.message && Array.isArray(response.message)) {
        message = response.message.join(', ');
      }
    } else if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const response = {
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: req.url,
    };

    return res.status(status).json(response);
  }
}
