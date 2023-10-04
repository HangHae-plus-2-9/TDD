// 필요한 모듈을 임포트합니다.
import { ApiProperty } from '@nestjs/swagger'; // Swagger API 문서와 관련된 데코레이터를 임포트합니다.

// 토큰 페이로드 데이터를 정의하는 클래스를 생성합니다.
export class TokenPayloadDto {
  @ApiProperty() // Swagger API 문서에 expiresIn 속성을 표시하기 위한 데코레이터입니다.
  expiresIn: number; // 토큰의 만료 시간을 저장하는 속성입니다.

  @ApiProperty() // Swagger API 문서에 accessToken 속성을 표시하기 위한 데코레이터입니다.
  accessToken: string; // 액세스 토큰 문자열을 저장하는 속성입니다.

  // 생성자 메서드를 정의합니다. 이 메서드는 객체를 생성하고 초기화할 때 호출됩니다.
  constructor(data: { expiresIn: number; accessToken: string }) {
    this.expiresIn = data.expiresIn; // 전달된 데이터 객체로부터 expiresIn 속성 값을 초기화합니다.
    this.accessToken = data.accessToken; // 전달된 데이터 객체로부터 accessToken 속성 값을 초기화합니다.
  }
}
