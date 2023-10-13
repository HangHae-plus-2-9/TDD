import { Logger, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
// import { ProductsComponent } from './products.component';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), AuthModule],
  controllers: [ProductsController],
  providers: [
    Logger,
    ProductsService,
    {
      provide: 'ProductsRepositoryInterface',
      useClass: ProductsRepository,
    },
  ],
})
export class ProductsModule {}
