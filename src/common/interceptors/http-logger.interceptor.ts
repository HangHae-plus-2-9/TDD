import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { formattedString } from '../utils';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  constructor(private readonly cLogger: WinstonContextLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const res = httpContext.getResponse();
    const { method, originalUrl, ip, headers: reqHeaders, body: reqBody } = req;

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = res;
        const contentLength = res.get('content-length') || 0;
        const userAgent = req.get('user-agent') || '';
        const logMessage = `${method} ${originalUrl} ${statusCode} ${contentLength} ${
          Date.now() - now
        }ms - ${userAgent} ${ip}`;

        if (statusCode >= 500) {
          this.cLogger.error(formattedString(logMessage));
        } else if (statusCode >= 400) {
          this.cLogger.warn(formattedString(logMessage));
        } else {
          this.cLogger.log(formattedString(logMessage));
        }

        // 추가적으로 reqHeaders, reqBody를 로깅하고 싶다면 아래 주석을 해제하세요.
        // this.cLogger.verbose(`Headers: ${formattedString(reqHeaders)}`);
        // this.cLogger.verbose(`Body: ${formattedString(reqBody)}`);
      }),
    );
  }
}
