import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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

  it('GET /api/v1/health-check', () => {
    return request(app.getHttpServer()).get('/api/v1/health-check').expect(200);
  });

  it('GET /api/v1/products', () => {
    return request(app.getHttpServer()).get('/api/v1/products').expect(200);
  });

  it('GET /api/v1/products/1', () => {
    return request(app.getHttpServer()).get('/api/v1/products/1').expect(200);
  });

  xit('POST /api/v1/orders', () => {
    return request(app.getHttpServer())
      .post('/api/v1/orders')
      .send({
        productId: 1,
        quantity: 1,
      })
      .expect(201);
  });

  it('GET /api/vi/favorite', async () => {
    const res = await request(app.getHttpServer).get('/api/vi/fovorite');
    expect(res.statusCode).toBe(200);
  });
});
