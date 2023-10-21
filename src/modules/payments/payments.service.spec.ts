import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Payments } from '@/modules/payments/entity/payments.entity';
import { PaymentMethod } from '@/modules/payments/enum/payment-method.enum';
import { OrderEntity } from '@/modules/orders/entities/order.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PaymentStatus } from '@/modules/payments/enum/payment-status.enum';

describe('PaymentsService', () => {
  let sut: PaymentsService;
  let paymentsRepository: jest.Mocked<Repository<Payments>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: getRepositoryToken(Payments),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<PaymentsService>(PaymentsService);
    paymentsRepository = module.get(getRepositoryToken(Payments));
  });

  describe('create', () => {
    it('정상적인 Payments 생성 요청 시, Payments가 생성된다', async () => {
      // given
      const id = 3;
      const orderId = 5;
      const amount = 2_000;
      const payment = createPayment(id, orderId, amount);
      const expected = createPayment(id, orderId, amount);
      paymentsRepository.create.mockReturnValue(payment);

      // when
      const actual = await sut.create(orderId, amount);

      // then
      expect(actual).toEqual(expected);
    });

    it('이미 주문에 해당하는 결제 정보가 존재할 때는 ConflictException을 던진다', async () => {
      const orderId = 99;
      const amount = 9_900;
      paymentsRepository.save.mockRejectedValue({ code: '23505' });

      const createOperation = sut.create(orderId, amount);

      await expect(createOperation).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('존재하는 id로 Payments 객체를 조회할 수 있다', async () => {
      const expected = createPayment(2, 1, 10);
      paymentsRepository.findOneBy.mockResolvedValue(expected);

      const payment = await sut.findOne(2);

      expect(payment).toEqual(expected);
    });

    it('존재하지 않은 id로 조회시, NotFoundException을 던진다', async () => {
      paymentsRepository.findOneBy.mockRejectedValue(
        new NotFoundException('Payment not found'),
      );

      const findOneOperation = sut.findOne(1);

      await expect(findOneOperation).rejects.toThrowError(NotFoundException);
    });
  });

  describe('cancel', () => {
    it('결제 ID로 결제를 취소한다', async () => {
      const payment = createPayment(1, 2, 50_000);
      const canceledPayment = createPayment(
        1,
        2,
        50_000,
        PaymentMethod.CreditCard,
        PaymentStatus.CANCELED,
      );
      paymentsRepository.findOneBy.mockResolvedValue(payment);
      paymentsRepository.save.mockResolvedValue(canceledPayment);

      const actual = await sut.cancel(1);

      expect(actual.status).toEqual(PaymentStatus.CANCELED);
    });

    it('존재하지 않는 결제 ID로 결제를 취소하려 하면, NotFoundException을 던진다', async () => {
      const cancelOperation = sut.cancel(99);
      await expect(cancelOperation).rejects.toThrowError(NotFoundException);
    });

    it('이미 [결제취소] 상태이면 BadRequestException을 던진다', async () => {
      const canceledPayment = createPayment(
        1,
        2,
        50_000,
        PaymentMethod.CreditCard,
        PaymentStatus.CANCELED,
      );
      paymentsRepository.findOneBy.mockResolvedValue(canceledPayment);

      const cancelOperation = sut.cancel(2);

      await expect(cancelOperation).rejects.toThrowError(BadRequestException);
    });
  });

  describe('approve', () => {
    it('결제 ID로 결제 상태를 [결제완료]로 변경할 수 있다', async () => {
      const payment = createPayment(
        1,
        2,
        10_000,
        PaymentMethod.CreditCard,
        PaymentStatus.PENDING,
      );
      paymentsRepository.findOneBy.mockResolvedValue(payment);

      const actual = await sut.approve(1);

      expect(actual.status).toEqual(PaymentStatus.COMPLETED);
    });

    it('존재하지 않는 ID로 결제 상태를 변경 시, NotFoundException을 던진다', async () => {
      const approveOperation = sut.approve(99);

      await expect(approveOperation).rejects.toThrowError(NotFoundException);
    });

    it('결제 상태가 [결제대기]가 아니면 BadRequestException을 던진다', async () => {
      const payment = createPayment(
        1,
        2,
        10_000,
        PaymentMethod.CreditCard,
        PaymentStatus.COMPLETED,
      );
      paymentsRepository.findOneBy.mockResolvedValue(payment);

      const approveOperation = sut.approve(1);

      await expect(approveOperation).rejects.toThrowError(BadRequestException);
    });
  });
});

function createPayment(
  id: number,
  orderId: number,
  amount: number,
  method: PaymentMethod = PaymentMethod.CreditCard,
  status: PaymentStatus = PaymentStatus.PENDING,
) {
  // order
  const order = new OrderEntity();
  order.id = orderId;

  // payment
  const payment = new Payments();
  payment.id = id;
  payment.order = order;
  payment.amount = amount;
  payment.method = method;
  payment.status = status;

  return payment;
}
