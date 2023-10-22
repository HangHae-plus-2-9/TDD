import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  initializeTransactionalContext,
  deleteDataSourceByName,
} from 'typeorm-transactional';

// typeorm-transactional 사용시 필요
initializeTransactionalContext();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.enableVersioning();

    await app.init();
  });
  afterEach(async () => {
    // typeorm-transactional 사용시 필요 - 개별 테스트 후 datasource 삭제
    deleteDataSourceByName('default');
  });

  it('GET /api/v1/health-check', () => {
    return request(app.getHttpServer()).get('/api/v1/health-check').expect(200);
  });

  // TODO: migration에서 막혀서 주석 처리.. 나중에 해결 필요
  // it('GET /api/v1/products', () => {
  //   return request(app.getHttpServer()).get('/api/v1/products').expect(200);
  // });

  // TODO: deploy시 seeder 작업 후 주석 해제
  // it('GET /api/v1/products/1', () => {
  //   return request(app.getHttpServer()).get('/api/v1/products/1').expect(200);
  // });

  xit('POST /api/v1/orders', () => {
    return request(app.getHttpServer())
      .post('/api/v1/orders')
      .send({
        productId: 1,
        quantity: 1,
      })
      .expect(201);
  });

  // it('GET /api/vi/favorite', async () => {
  // // TODO: token 생성 및 첨부 필요
  //   const res = await request(app.getHttpServer).get('/api/v1/favorite');
  //   expect(res.statusCode).toBe(200);
  // });
});
