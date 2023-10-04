import { INestApplication } from '@nestjs/common';
import * as expressBasicAuth from 'express-basic-auth';
import { isDevelopment, required } from '.';
import { BasicAuthMiddlewareOptions } from 'express-basic-auth';

// Swagger URL 반환 함수
// Function to return the Swagger URL
const swaggerUrl = () => required('SWAGGER_URL') as string;

// API 인증 사용자 이름 반환 함수
// Function to return the API authentication username
const apiAuthUser = () => required('API_AUTH_USER') as string;

// API 인증 비밀번호 반환 함수
// Function to return the API authentication password
const apiAuthPassword = () => required('API_AUTH_PASSWORD') as string;

// API 인증 설정 함수
// Function to set up API authentication
export function setupApiAuth(app: INestApplication): void {
  // 개발 환경에서는 API 인증을 사용하지 않음
  // Don't use API authentication in development
  if (isDevelopment()) return;

  // 정의한 URL에 기본 인증 (Basic Authentication) 미들웨어를 사용
  // Use Basic Authentication middleware on defined URL
  app.use(
    defineAuthUrl(swaggerUrl()), // 인증을 설정할 URL 정의
    expressBasicAuth(defineOptions()), // 기본 인증 옵션 정의
  );
}

// 기본 인증 옵션을 정의하는 함수
// Function to define basic authentication options
const defineOptions = (): BasicAuthMiddlewareOptions => {
  return {
    challenge: true, // 401 응답 시 WWW-Authenticate 헤더를 포함
    users: {
      // 인증 사용자 이름 및 비밀번호 정의
      // Define authentication username and password
      [apiAuthUser()]: apiAuthPassword(),
    },
  };
};

// 인증을 적용할 URL 정의 함수
// Function to define the URL to apply authentication
function defineAuthUrl(url: string): string[] {
  // Swagger 문서의 JSON 형식에도 인증을 적용하기 위해 URL을 배열로 반환
  // Return URLs as an array to apply authentication to Swagger docs in JSON format as well
  return [url, url + '-json'];
}
