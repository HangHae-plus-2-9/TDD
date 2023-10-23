import { CartItemEntity } from '../entities/cart-item.entity';
import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartItemsDto extends PickType(CartItemEntity, [
  'product',
  'quantity',
] as const) {
  @IsNumber()
  @IsNotEmpty({ message: '카트에 담을 상품을 추가해 주세요.' })
  product_id: number;

  @IsNumber()
  @IsNotEmpty({ message: '선택된 상품이 없습니다.' })
  quantity: number;
}
