import { NotFoundException } from '@nestjs/common';
import { messages } from '../resources';

// `ProductNotFoundException`은 특별히 상품이 발견되지 않을 때 발생하는 예외입니다.
export class ProductNotFoundException extends NotFoundException {
  // 생성자는 선택적으로 `error` 문자열을 받아, 예외를 발생시킵니다.
  // 만약 `error`가 제공되지 않는다면, 기본 메시지로 `messages.PRODUCT_NOT_FOUND_EXCEPTION`이 사용됩니다.
  constructor(error?: string) {
    // `super`를 호출하여 부모 클래스(`NotFoundException`)의 생성자를 실행합니다.
    // 이는 HTTP 404 응답과, 주어진 에러 메시지 또는 기본 메시지를 연결합니다.
    super(messages.PRODUCT_NOT_FOUND_EXCEPTION, error);
  }
}
