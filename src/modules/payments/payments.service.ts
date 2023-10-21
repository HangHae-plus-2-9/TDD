import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payments } from '@/modules/payments/entity/payments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from '@/modules/payments/enum/payment-method.enum';
import { PaymentStatus } from '@/modules/payments/enum/payment-status.enum';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private readonly paymentsRepository: Repository<Payments>,
  ) {}

  async create(
    orderId: number,
    amount: number,
    method: PaymentMethod = PaymentMethod.CreditCard,
  ) {
    try {
      const newPayments = this.paymentsRepository.create({
        amount,
        method,
        order: { id: orderId },
      });
      await this.paymentsRepository.save(newPayments);
      return newPayments;
    } catch (error) {
      // Postgres UniqueViolation code
      if (error.code === '23505') {
        throw new ConflictException();
      }
      throw error;
    }
  }

  async findOne(id: number) {
    const payment = await this.paymentsRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async cancel(id: number) {
    const payment = await this.findOne(id);
    if (payment.status === PaymentStatus.CANCELED) {
      throw new BadRequestException('Payment already canceled');
    }
    payment.status = PaymentStatus.CANCELED;
    return this.paymentsRepository.save(payment);
  }

  async approve(id: number) {
    const payment = await this.findOne(id);
    if (payment.status !== PaymentStatus.PENDING) {
      throw new BadRequestException('Payment status is not "PENDING"');
    }
    payment.status = PaymentStatus.COMPLETED;
    return payment;
  }
}
