// 필요한 모듈과 열거형 타입들을 임포트합니다.
import { ROLE_TYPE, TOKEN_TYPE } from '@/common/resources'; // 공통 리소스에서 역할과 토큰 타입 열거형을 임포트합니다.
import { ApiProperty } from '@nestjs/swagger'; // Swagger API 문서 속성 데코레이터를 임포트합니다.

// 액세스 토큰의 페이로드를 정의하는 클래스를 생성합니다.
export class AccessTokenPayload {
  @ApiProperty() // Swagger API 문서에 userId 속성을 표시하기 위한 데코레이터입니다.
  userId: number; // 사용자의 식별자입니다.

  @ApiProperty() // Swagger API 문서에 type 속성을 표시하기 위한 데코레이터입니다.
  type: TOKEN_TYPE; // 토큰의 타입입니다.

  @ApiProperty() // Swagger API 문서에 role 속성을 표시하기 위한 데코레이터입니다.
  role: ROLE_TYPE; // 사용자의 역할 타입입니다.
}
