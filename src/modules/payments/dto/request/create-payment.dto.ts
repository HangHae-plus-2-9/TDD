import { IsEnum, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@/modules/payments/enum/payment-method.enum';

export class CreatePaymentDto {
  @ApiProperty({ required: true, example: 3 })
  @IsUUID()
  orderId: string;

  @ApiProperty({ required: true, example: 5000 })
  @IsNumber()
  amount: number;

  @IsEnum(PaymentMethod)
  method: PaymentMethod = PaymentMethod.CreditCard;
}
