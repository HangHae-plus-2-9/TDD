import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { formattedString } from '../utils';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  constructor(private readonly cLogger: WinstonContextLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logRequest(context, now);
      }),
      catchError((error) => {
        this.logRequest(context, now, error);
        throw error;
      }),
    );
  }

  private logRequest(
    context: ExecutionContext,
    startTime: number,
    error?: any,
  ) {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const res = httpContext.getResponse();
    const { method, originalUrl, ip } = req;
    const { statusCode } = res;
    const contentLength = res.get('content-length') || 0;
    const userAgent = req.get('user-agent') || '';

    const duration = Date.now() - startTime;
    const logMessage = `${method} ${originalUrl} ${statusCode} ${contentLength} ${duration}ms - ${userAgent} ${ip}`;

    // 오류 발생 시에는 에러 메세지도 같이 로깅
    if (error) {
      this.cLogger.error(formattedString(`${logMessage} ${error.message}`));
    } else if (statusCode >= 500) {
      this.cLogger.error(formattedString(logMessage));
    } else if (statusCode >= 400) {
      this.cLogger.warn(formattedString(logMessage));
    } else {
      this.cLogger.log(formattedString(logMessage));
    }

    // 추가적으로 reqHeaders, reqBody를 로깅하고 싶다면 아래 주석을 해제하세요.
    // this.cLogger.verbose(`Headers: ${formattedString(reqHeaders)}`);
    // this.cLogger.verbose(`Body: ${formattedString(reqBody)}`);
  }
}
