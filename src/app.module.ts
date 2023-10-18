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
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    AlsModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    DatabaseModule,
    HealthCheckModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly als: AsyncLocalStorage<any>) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        const requestId = uuidv4() as string;
        req.requestId = requestId;
        req.headers['request-id'] = requestId;
        const store = {
          requestId,
        };
        this.als.run(store, () => {
          console.log(this.als.getStore());
          return next();
        });
      })
      .forRoutes('*');
  }
}
