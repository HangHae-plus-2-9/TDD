// 필요한 모듈들과 서비스를 임포트합니다.
import { Test, TestingModule } from '@nestjs/testing'; // NestJS의 테스팅 유틸리티를 임포트합니다.
import { AuthService } from './auth.service'; // 테스트할 AuthService를 임포트합니다.
import { JwtService } from '@nestjs/jwt'; // JWT 관련 서비스를 임포트합니다.

// AuthService에 대한 테스트 스위트를 정의합니다.
describe('AuthService', () => {
  let service: AuthService; // 테스트할 서비스의 인스턴스를 저장할 변수를 선언합니다.

  // 각 테스트 케이스를 실행하기 전에 실행되는 코드 블록을 정의합니다.
  beforeEach(async () => {
    // 테스트 모듈을 생성하고 컴파일합니다.
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService, AuthService], // 테스트에서 사용할 제공자(서비스)를 정의합니다.
    }).compile();

    // 생성된 모듈로부터 AuthService 인스턴스를 가져옵니다.
    service = module.get<AuthService>(AuthService);
  });

  // 첫 번째 테스트 케이스를 정의합니다.
  it('should be defined', () => {
    // service가 정의되어 있음을 검사하는 테스트를 실행합니다.
    expect(service).toBeDefined();
  });
});
