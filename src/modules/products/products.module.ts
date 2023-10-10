import { Module } from '@nestjs/common';
// import { ProductsService } from './products.service';
// import { ProductsController } from './products.controller';
// import { ProductsComponent } from './products.component';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [
    // ProductsController
  ],
  providers: [
    // ProductsService,
    // ProductsComponent,
    {
      provide: 'ProductsRepositoryInterface',
      useClass: ProductsRepository,
    },
  ],
})
export class ProductsModule {}
