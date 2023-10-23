import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors';
import { WinstonLogger, setupApiAuth, setupSwagger } from './config';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger,
    abortOnError: true,
  });

  app.setGlobalPrefix('api');
  app.enableVersioning();
  app.enableCors({ origin: '*' });

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  setupApiAuth(app);
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
