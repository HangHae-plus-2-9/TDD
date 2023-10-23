import { CartItemEntity } from '../entities/cart-item.entity';
import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartItemsDto extends PickType(CartItemEntity, [
  'quantity',
] as const) {
  @IsNumber()
  @IsNotEmpty({ message: '선택된 상품이 없습니다.' })
  quantity: number;
}
