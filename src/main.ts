import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';
import { TransformInterceptor } from './common/interceptors';
import { WinstonLogger, setupApiAuth, setupSwagger } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger,
  });

  app.setGlobalPrefix('api');
  app.enableVersioning();
  app.enableCors({ origin: '*' });

  const httpExceptionFilter = app.get(HttpExceptionFilter);
  app.useGlobalFilters(httpExceptionFilter);
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
