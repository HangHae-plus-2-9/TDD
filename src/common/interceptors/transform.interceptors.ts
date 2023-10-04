import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Response 인터페이스는 데이터를 포함한 응답의 형태를 정의합니다.
export interface Response<T> {
  data: T;
}

// @Injectable 데코레이터로 이 클래스를 NestJS의 의존성 주입 시스템에 등록합니다.
@Injectable()
// TransformInterceptor 클래스는 NestInterceptor 인터페이스를 구현하여
// HTTP 응답을 변형하기 위한 인터셉터를 정의합니다.
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  // intercept 메서드는 인터셉터가 수행해야 하는 로직을 정의합니다.
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // next.handle()은 요청 처리 파이프라인의 다음 단계를 호출하며,
    // 이를 통해 다음 파이프 또는 핸들러로 요청을 전달합니다.
    // pipe(map(...))를 사용하여 Observable<Response<T>> 형태로 데이터를 변형/매핑합니다.
    return next.handle().pipe(map((data) => ({ success: true, data })));
    // 여기서 data는 원래 핸들러에서 반환된 결과입니다.
    // { success: true, data } 형태로 응답을 변형하여 클라이언트로 전달합니다.
  }
}
