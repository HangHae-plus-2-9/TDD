import { PickType } from '@nestjs/swagger';
import { FavoriteEntity } from '../entities/favorite.entity';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FavoriteProductDto extends PickType(FavoriteEntity, [
  'product_id',
] as const) {
  @IsUUID()
  @IsNotEmpty({ message: '즐겨찾기 할 상품을 추가해 주세요.' })
  product_id: string;
}
