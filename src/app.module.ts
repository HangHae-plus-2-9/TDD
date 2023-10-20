import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AlsModule } from './als/als.module';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestIdMiddleware } from './common/middlewares/request-id.middleware';
import { WinstonContextModule } from './winston-context/winston-context.module';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    AlsModule,
    DatabaseModule,
    HealthCheckModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    AuthModule,
    WinstonContextModule,
    FavoriteModule,
    CartModule,
  ],
  providers: [HttpExceptionFilter],
})
export class AppModule implements NestModule {
  constructor(private readonly als: AsyncLocalStorage<any>) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
