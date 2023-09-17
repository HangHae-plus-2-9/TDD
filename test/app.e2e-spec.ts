import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    console.log('Setting up the test module...');
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    console.log('Test module compiled.');

    app = moduleFixture.createNestApplication();
    console.log('Nest application created.');

    await app.init();
    console.log('Nest application initialized.');
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/health-check (GET)', () => {
    return request(app.getHttpServer()).get('/health-check').expect(200);
  });
});
