import { Logger } from '@nestjs/common';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch 데코레이터를 사용하여 이 클래스를 예외 필터로 정의합니다.
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // Logger 인스턴스를 생성하여 이 클래스의 로깅을 담당합니다.
  private readonly logger = new Logger(HttpExceptionFilter.name);

  // catch 메서드는 ExceptionFilter 인터페이스를 구현합니다.
  // 이 메서드는 애플리케이션의 예외를 잡아내어 처리합니다.
  catch(exception: Error, host: ArgumentsHost) {
    // HTTP 컨텍스트를 가져오고, express의 Request와 Response 객체를 가져옵니다.
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    // 에러가 발생한 요청의 body, query, params를 로깅하기 위해 저장합니다.
    const errorReq = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    // 요청 정보와 에러가 발생한 요청의 데이터를 로깅합니다.
    this.logger.error(
      `${req.method} ${req.url} ${JSON.stringify(errorReq, null, 2)}`,
    );
    // 예외의 스택 추적을 로깅합니다.
    this.logger.error(exception.stack);

    // 만약 잡힌 예외가 HttpException의 인스턴스가 아니라면,
    // 일반적인 서버 오류(500 Internal Server Error) 예외를 생성합니다.
    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    // 클라이언트로 보내질 응답 객체를 구성합니다.
    const response = {
      statusCode: (exception as HttpException).getStatus(),
      message: (exception as HttpException).message,
      timestamp: new Date().toISOString(),
      path: req.url,
    };

    // HTTP 응답 상태 코드와 응답 객체를 클라이언트로 보냅니다.
    res.status((exception as HttpException).getStatus()).json(response);
  }
}
