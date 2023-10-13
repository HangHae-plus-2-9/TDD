import { PickType } from '@nestjs/swagger';
import { FavoriteEntity } from '../entities/favorite.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ProductEntity } from '@/modules/products/entities/product.entity';

export class FavoriteProductDto extends PickType(FavoriteEntity, [
  'product_id',
] as const) {
  @IsNumber()
  @IsNotEmpty({ message: '즐겨찾기 할 상품을 추가해 주세요.' })
  product_id: number;
}
