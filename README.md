# hhp-nestjs-app

## How To Run

1. 로컬 개발 환경

   ```bash
   docker-compose up postgres

   npm ci
   npm run start:dev

   npm run test
   npm run test:e2e # if it pass, the health check is ok
   ```

2. 로컬 개발 환경(도커)

   ```bash
   docker-compose up
   ```

3. e2e 테스트

   ```bash
   docker-compose up postgres
   npm run test:e2e
   ```

   혹은

   ```bash
   npm run test:e2e:docker
   ```

## health check

```bash
curl --location 'http://localhost:3000/health-check'
```

## API

### 유저 - customer

- POST /api/v1/users - 회원가입
  - name: string
  - email: string
  - password: string
  - phone: string
  - zipCode: string
  - address1: string
  - address2: string
  - addressDetail: string
- GET /api/v1/users
- GET /api/v1/users/:id
- PATCH /api/v1/users/:id
- DELETE /api/v1/users/:id
- POST /api/v1/users/login - 로그인
  - email: string
  - password: string

### 유저 - seller

- POST /api/v1/sellers - 판매자 등록
  - name: string
  - email: string
  - password: string
  - phone: string
- GET /api/v1/sellers
- GET /api/v1/sellers/:id
- PATCH /api/v1/sellers/:id
- DELETE /api/v1/sellers/:id
- POST /api/v1/sellers/login - 판매자 로그인
  - email: string
  - password: string
- GET /api/v1/sellers/:id/stores - 상점 목록
- GET /api/v1/sellers/:id/reports - 수익 보고서

### 즐겨찾기

- POST /api/v1/favorites/add - 즐겨찾기 추가
  - userId: string
  - productId: string
- GET /api/v1/favorites/:userId - 즐겨찾기 목록
- DELETE /api/v1/favorites/:userId/:favoriteId

### 상점

- POST /api/v1/stores - 상점 등록
  - sellerId: string
  - storeName: string
  - ownerName: string
  - businessNumber: string
  - phone: string
  - zipCode: string
  - address1: string
  - address2: string
  - addressDetail: string
  - description: string
  - categoryIds: number[]
- GET /api/v1/stores
- GET /api/v1/stores/:id
- PATCH /api/v1/stores/:id
- DELETE /api/v1/stores/:id

### 카테고리

- POST /api/v1/categories - 카테고리 등록 (단일 or 계층 선택필요)
- GET /api/v1/categories
- GET /api/v1/categories/:id
- PATCH /api/v1/categories/:id
- DELETE /api/v1/categories/:id

### 주문

- POST /api/v1/orders - 주문
  - username: string
  - phone: string
  - zipCode: string
  - address1: string
  - address2: string
  - addressDetail: string
  - products: { productId: string, quantity: number }[]
- GET /api/v1/orders/:orderId
- GET /api/v1/orders/user/:userId - 유저 주문 목록
- GET /api/v1/orders/store/:storeId - 상점 주문 목록
- PATCH /api/v1/orders/:orderId
- DELETE /api/v1/orders/:orderId
- POST /api/v1/orders/:orderId/paycheck - 결제 확인
- POST /api/v1/orders/:orderId/confirm-shipping - 배송 확인
- POST /api/v1/orders/:orderId/cancel - 주문 취소

### 상품

- POST /api/v1/products - 상품 등록
  - storeId: string
  - name: string
  - price: number
  - stock: number
  - description: string
  - categoryIds: number[]
- GET /api/v1/products
  - query: { categoryIds: string[], search: string, page: number, limit: number, sort: string, order: 'ASC' | 'DESC' }
- GET /api/v1/products/:id
- PATCH /api/v1/products/:id
- DELETE /api/v1/products/:id

| 라이브러리                       | 설명                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| @nestjs/axios                    | Axios HTTP 클라이언트를 NestJS에 통합하는 라이브러리                                              |
| @nestjs/common                   | NestJS에서 공통적으로 사용되는 기능을 포함하는 라이브러리                                         |
| @nestjs/config                   | 설정 관리를 위한 환경 변수 로딩 및 사용을 지원하는 라이브러리                                     |
| @nestjs/core                     | NestJS의 핵심 모듈 및 기능을 포함하는 라이브러리                                                  |
| @nestjs/jwt                      | JWT (JSON Web Token) 인증을 지원하는 라이브러리                                                   |
| @nestjs/mapped-types             | TypeScript 타입 매핑 및 변환을 도와주는 라이브러리                                                |
| @nestjs/passport                 | Passport를 NestJS와 통합하여 인증을 처리하는 라이브러리                                           |
| @nestjs/platform-express         | NestJS와 Express를 통합하는 라이브러리                                                            |
| @nestjs/swagger                  | Swagger 문서 생성 및 API 문서화를 지원하는 라이브러리                                             |
| @nestjs/terminus                 | NestJS 애플리케이션의 헬스 체크 엔드포인트를 생성하는 라이브러리                                  |
| @nestjs/typeorm                  | TypeORM과 NestJS를 통합하여 데이터베이스 연동을 지원하는 라이브러리                               |
| bcrypt                           | 비밀번호 해싱 및 검증을 위한 라이브러리                                                           |
| cross-env                        | 환경 변수 설정을 OS에 독립적으로 처리하기 위한 라이브러리                                         |
| express-basic-auth               | Express 애플리케이션에서 HTTP 기본 인증을 구현하기 위한 라이브러리                                |
| lodash                           | 유용한 유틸리티 함수를 제공하는 자바스크립트 라이브러리                                           |
| nest-winston                     | Winston 로깅 라이브러리를 NestJS에 통합하는 라이브러리                                            |
| pg                               | PostgreSQL 데이터베이스 연결 드라이버                                                             |
| reflect-metadata                 | TypeScript 런타임 타입 리플렉션을 지원하는 라이브러리                                             |
| rimraf                           | 디렉토리 및 파일을 안전하게 삭제하기 위한 라이브러리                                              |
| rxjs                             | 반응형 프로그래밍을 위한 라이브러리                                                               |
| typeorm                          | TypeScript와 JavaScript를 위한 ORM (객체 관계 매핑) 라이브러리                                    |
| winston                          | 다양한 로깅 전략을 지원하는 로깅 라이브러리                                                       |
| @nestjs/cli                      | NestJS 애플리케이션 개발 및 관리를 위한 명령 줄 도구                                              |
| @nestjs/schematics               | NestJS 애플리케이션의 스키마와 관련된 Schematics 컬렉션                                           |
| @nestjs/testing                  | NestJS 애플리케이션을 테스트하기 위한 테스트 유틸리티 및 모듈                                     |
| @types/bcrypt, @types/express    | TypeScript를 사용하여 라이브러리와 Express에 대한 타입 정의를 제공하는 패키지                     |
| @types/jest, @types/lodash       | TypeScript를 사용하여 Jest 및 Lodash와 관련된 타입 정의를 제공하는 패키지                         |
| @types/node                      | Node.js의 타입 정의를 포함한 패키지                                                               |
| @types/supertest                 | TypeScript를 사용하여 Supertest와 관련된 타입 정의를 제공하는 패키지                              |
| @typescript-eslint/eslint-plugin | ESLint의 TypeScript 플러그인                                                                      |
| @typescript-eslint/parser        | ESLint에서 TypeScript 코드를 분석하기 위한 파서                                                   |
| eslint, eslint-config-prettier   | 코드 스타일과 정적 분석을 위한 린트 도구 및 구성 파일                                             |
| eslint-plugin-prettier           | ESLint와 Prettier 플러그인을 함께 사용하여 코드 포맷팅을 위한 도구                                |
| jest                             | JavaScript 및 TypeScript 애플리케이션을 위한 테스트 프레임워크                                    |
| prettier                         | 코드 포맷팅 및 스타일링 도구                                                                      |
| source-map-support               | 소스 맵 지원을 통해 스택 트레이스에 원래 TypeScript 코드를 포함시킬 수 있는 도구                  |
| supertest                        | HTTP 요청을 보내고 테스트하기 위한 슈퍼 에이전트 (SuperTest) 라이브러리                           |
| ts-jest, ts-loader, ts-node      | TypeScript와 Jest를 함께 사용하고 Jest 구성을 위한 도구 및 로더                                   |
| tsconfig-paths                   | TypeScript 프로젝트에서 tsconfig.json 파일의 paths 설정을 사용하여 모듈 경로를 관리하기 위한 도구 |
| typescript                       | TypeScript 컴파일러                                                                               |

## 디렉터리 구조

| 경로                            | 설명                                                                                                              |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| src\common\decorators           | 커스텀 데코레이터를 정의하는 디렉터리.                                                                            |
| src\common\entities             | 애플리케이션에서 사용될 데이터 엔티티(모델)를 정의하는 디렉터리.                                                  |
| src\common\exceptions           | 커스텀 예외 클래스를 정의하고 예외 처리 로직을 구현하는 디렉터리.                                                 |
| src\common\filters              | 예외 필터를 정의하는 디렉터리로, 예외가 발생했을 때 추가적인 로직을 수행하는 필터를 만듭니다.                     |
| src\common\guards               | 인증 및 권한 검사를 처리하는 가드 클래스를 포함하는 디렉터리.                                                     |
| src\common\interceptors         | 애플리케이션의 요청 및 응답을 가로채고 수정하는 인터셉터를 정의하는 디렉터리.                                     |
| src\common\repositories         | 데이터베이스와 상호작용하기 위한 리포지토리 클래스를 정의하는 디렉터리.                                           |
| src\common\resources            | 애플리케이션에서 사용되는 리소스(문자열, 메시지 등)를 정의하는 디렉터리.                                          |
| src\common\utils.ts             | 공용 유틸리티 함수 및 도구 함수를 정의하는 TypeScript 파일.                                                       |
| src\config                      | 환경 변수 설정 및 구성 파일을 저장하는 디렉터리.                                                                  |
| src\database\migrations         | 데이터베이스 마이그레이션 파일을 저장하는 디렉터리로, 데이터베이스 스키마 변경을 추적하고 적용하는 데 사용됩니다. |
| src\database\data-source.ts     | 데이터베이스 연결 정보 및 설정을 정의하는 TypeScript 파일.                                                        |
| src\database\database.module.ts | TypeORM을 사용하여 데이터베이스와의 연결을 설정하는 NestJS 모듈.                                                  |
| src\modules                     | 프로젝트 모듈을 포함하는 디렉터리로, 각 모듈은 프로젝트의 다른 부분과 독립적으로 구성됩니다.                      |
| src\app.module.ts               | NestJS 애플리케이션의 메인 모듈로, 모든 모듈을 불러오고 애플리케이션의 루트 모듈로 사용됩니다.                    |
| src\main.ts                     | 애플리케이션의 진입점 파일로, NestJS 애플리케이션을 시작하는 스크립트가 포함되어 있습니다.                        |
