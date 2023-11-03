import { PAYMENT_METHOD } from '@/common/resources';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  method: PAYMENT_METHOD;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsDateString()
  paidAt?: Date;

  @IsOptional()
  @IsDateString()
  canceledAt?: Date;
}
