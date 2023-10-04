import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// UpdateUserDto 클래스는 PartialType을 사용하여 CreateUserDto를 확장(extends)합니다.
// PartialType은 '@nestjs/swagger' 라이브러리에서 제공하는 유틸리티로,
// 기존 DTO 클래스의 모든 속성을 선택적(optional) 속성으로 만드는 새로운 타입을 생성합니다.
export class UpdateUserDto extends PartialType(CreateUserDto) {
  // 이 경우, UpdateUserDto는 CreateUserDto의 모든 속성을 가지고 있지만,
  // 모든 속성이 선택적입니다.
  // 이는 사용자 정보 업데이트 시 일부 필드만 제공하더라도 유효한 DTO로 간주됨을 의미합니다.
  // 예를 들어, 사용자의 이메일만 업데이트 하고자 할 때, 이메일 필드만 포함하여 요청을 보낼 수 있습니다.
  // 필요하다면, 여기에 CreateUserDto에 없는 추가적인 프로퍼티나 메서드를 정의할 수 있습니다.
}
