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
