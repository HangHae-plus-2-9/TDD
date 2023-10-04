import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

// AuthUser 함수는 NestJS의 커스텀 데코레이터를 생성합니다.
export function AuthUser() {
  // createParamDecorator 함수는 커스텀 데코레이터를 만들어주며,
  // 이는 ExecutionContext를 인자로 받아 HTTP 요청 등의 세부 컨텍스트를 제공합니다.
  return createParamDecorator(
    // _data: 이 데코레이터에 전달되는 데이터 (현재 사용되지 않음)
    // context: 실행 컨텍스트의 참조를 제공합니다.
    (_data: unknown, context: ExecutionContext) => {
      // context에서 HTTP 요청 객체를 가져옵니다.
      const request = context.switchToHttp().getRequest();
      // 이전 가드 또는 미들웨어에서 요청 객체에 추가된 tokenPayload를 추출합니다.
      const tokenPayload = request.tokenPayload;
      // tokenPayload를 반환하여,
      // 이를 사용하는 라우트 핸들러의 매개변수에서 사용할 수 있도록 합니다.
      return tokenPayload;
    },
  )();
}
