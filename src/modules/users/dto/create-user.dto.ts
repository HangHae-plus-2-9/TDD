import { UserEntity } from '../entities/user.entity';

// CreateUserDto 클래스는 UserEntity를 확장(extends)합니다.
// DTO(Data Transfer Object)는 클라이언트와 서버 간에 데이터를 전송하는 객체입니다.
// 이 경우, CreateUserDto는 새로운 사용자를 생성할 때 사용되는 데이터 구조를 정의할 것으로 보입니다.
export class CreateUserDto extends UserEntity {
  // 여기에서는 UserEntity의 모든 속성들이 CreateUserDto에 포함되어 있습니다.
  // 필요하다면, 여기에서 추가적인 속성이나 메서드를 정의할 수 있습니다.
  // 예를 들면, 추가적인 유효성 검사 로직이나, 기본값 설정 등이 있을 수 있습니다.
  // 예시:
  // additionalProperty: string;
}
