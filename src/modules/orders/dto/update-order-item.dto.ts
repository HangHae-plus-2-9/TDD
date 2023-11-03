import { IsNumber, Min } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @IsNumber()
  @Min(0)
  quantity: number;
}
