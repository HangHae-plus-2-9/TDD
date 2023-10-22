import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { UpdatePaymentDto } from './update-payment.dto';
import { UpdateShippingDto } from './update-shipping.dto';
import { UpdateOrderItemDto } from './update-order-item.dto';

export class UpdateOrderDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePaymentDto)
  paymentInfo: UpdatePaymentDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateShippingDto)
  shippingInfo: UpdateShippingDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderItemDto)
  orderItems: UpdateOrderItemDto[];
}
