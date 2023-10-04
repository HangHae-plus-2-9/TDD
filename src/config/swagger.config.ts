import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { required } from '.';

// Swagger를 설정하여 API 문서화를 구현하는 함수입니다.
export const setupSwagger = (app: INestApplication): void => {
  // DocumentBuilder를 사용하여 Swagger 옵션을 설정합니다.
  const options = new DocumentBuilder()
    .setTitle('News4U Api Documentation') // API 문서의 제목을 설정합니다.
    .setDescription('The News4U API description') // API 문서의 설명을 설정합니다.
    .setVersion('1.0.0') // API 문서의 버전을 설정합니다.
    .build(); // 설정된 옵션을 바탕으로 Swagger 문서를 빌드합니다.

  // 위에서 빌드된 문서 옵션을 바탕으로 Swagger 문서를 생성합니다.
  const document = SwaggerModule.createDocument(app, options);

  // 환경변수에서 Swagger UI의 URL endpoint를 가져옵니다.
  const swaggerUrl = required('SWAGGER_URL') as string;

  // 생성된 Swagger 문서와 설정된 URL을 이용하여 Swagger UI를 설정합니다.
  // 이를 통해 [호스트]/[SWAGGER_URL]에서 API 문서를 확인할 수 있습니다.
  SwaggerModule.setup(swaggerUrl, app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Swagger 세션간의 인증 정보를 유지합니다.
    },
  });
};
