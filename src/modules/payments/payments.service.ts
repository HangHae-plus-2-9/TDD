import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payments } from '@/modules/payments/entity/payments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from '@/modules/payments/enum/payment-method.enum';

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
}
