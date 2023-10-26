import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentsService } from '@/modules/payments/payments.service';
import { CreatePaymentDto } from '@/modules/payments/dto/request/create-payment.dto';
import { WinstonContextLogger } from '../../winston-context/winston-context.logger';

@ApiTags('payments')
@Controller({ version: '1', path: 'payments' })
export class PaymentsController {
  constructor(
    private readonly cLogger: WinstonContextLogger,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const paymentResult = await this.fetchPaymentResult();
    this.cLogger.log(JSON.stringify(paymentResult));
    const { orderId, amount, method } = createPaymentDto;
    return this.paymentsService.create(orderId, amount, method);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentsService.cancel(id);
  }

  @Patch(':id/approve')
  approve(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentsService.approve(id);
  }

  private async fetchPaymentResult() {
    const result = await fetch(process.env.MOCK_PAYMENT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 10000,
        cardNumber: '1234-1234-1234-1234',
        cardHolder: 'FORD',
        expirationDate: '2024-12',
        securityCode: '123',
      }),
    });
    if (result.status !== 200) {
      this.cLogger.error('Payment failed');
      throw new Error('Payment failed');
    }
    return result.json();
  }
}
