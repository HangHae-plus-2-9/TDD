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

스웨거 문서 참조 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Live DB Migration

```bash
# production env 사용
# database.config.ts의 isProduction true로 변경해주어야 함 - ssl 설정때문
npm run typeorm:migration:generate
npm run typeorm:migration:run
```
