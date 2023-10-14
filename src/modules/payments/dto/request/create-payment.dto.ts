import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@/modules/payments/enum/payment-method.enum';

export class CreatePaymentDto {
  @ApiProperty({ required: true, example: 3 })
  @IsPositive()
  orderId: number;

  @ApiProperty({ required: true, example: 5000 })
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}
