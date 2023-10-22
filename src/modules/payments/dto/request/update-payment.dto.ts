import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from '@/modules/payments/dto/request/create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
