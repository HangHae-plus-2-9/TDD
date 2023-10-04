// 필요한 모듈과 클래스들을 임포트합니다.
import { NestFactory } from '@nestjs/core'; // Nest 애플리케이션을 생성하기 위한 팩토리
import { AppModule } from './app.module'; // 애플리케이션의 루트 모듈
import { HttpExceptionFilter } from './common/filters/http.exception.filter'; // HTTP 예외를 처리하는 필터
import { TransformInterceptor } from './common/interceptors'; // 응답을 변형하는 인터셉터
import { WinstonLogger, setupApiAuth, setupSwagger } from './config'; // 로거 및 설정 관련 유틸리티 함수들

// 비동기 함수로 애플리케이션의 부트스트랩(초기 설정 및 실행)을 처리합니다.
async function bootstrap() {
  // 애플리케이션 인스턴스를 생성하고, Winston 로거를 사용합니다.
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger,
  });

  // 모든 라우트에 'api' 접두사를 추가합니다.
  app.setGlobalPrefix('api');

  // API 버전 관리를 활성화합니다.
  app.enableVersioning();

  // 모든 출처에서의 CORS 요청을 허용합니다.
  app.enableCors({ origin: '*' });

  // 전역 필터를 설정하여, HTTP 예외를 처리합니다.
  app.useGlobalFilters(new HttpExceptionFilter());

  // 전역 인터셉터를 설정하여, 응답을 변형합니다.
  // 필터랑
  app.useGlobalInterceptors(new TransformInterceptor());

  // API 인증 관련 설정을 합니다.
  setupApiAuth(app);

  // Swagger 문서 관련 설정을 합니다.
  setupSwagger(app);

  // 애플리케이션을 3000 포트에서 수신 대기하도록 설정합니다.
  await app.listen(3000);
}

// bootstrap 함수를 호출하여, 애플리케이션을 시작합니다.
bootstrap();
