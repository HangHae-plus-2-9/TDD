import { PAYMENT_METHOD } from '@/common/resources';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
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
