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
import { v4 as uuidv4 } from 'uuid';

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
      const id = uuidv4();
      const orderId = uuidv4();
      const amount = 2_000;
      const method = PaymentMethod.CreditCard;
      const payment = createPayment(id, orderId, amount, method);
      const expected = createPayment(id, orderId, amount, method);
      paymentsRepository.create.mockReturnValue(payment);

      // when
      const actual = await sut.create(orderId, amount, method);

      // then
      expect(actual).toEqual(expected);
    });

    it('이미 주문에 해당하는 결제 정보가 존재할 때는 ConflictException을 던진다', async () => {
      const orderId = uuidv4();
      const amount = 9_900;
      const method = PaymentMethod.CreditCard;
      paymentsRepository.save.mockRejectedValue({ code: '23505' });

      const createOperation = sut.create(orderId, amount, method);

      await expect(createOperation).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('존재하는 id로 Payments 객체를 조회할 수 있다', async () => {
      const id = uuidv4();
      const orderId = uuidv4();
      const expected = createPayment(id, orderId, 10);
      paymentsRepository.findOneBy.mockResolvedValue(expected);

      const payment = await sut.findOne(id);

      expect(payment).toEqual(expected);
    });

    it('존재하지 않은 id로 조회시, NotFoundException을 던진다', async () => {
      const nonExistId = uuidv4();
      paymentsRepository.findOneBy.mockRejectedValue(
        new NotFoundException('Payment not found'),
      );

      const findOneOperation = sut.findOne(nonExistId);

      await expect(findOneOperation).rejects.toThrowError(NotFoundException);
    });
  });

  describe('cancel', () => {
    it('결제 ID로 결제를 취소한다', async () => {
      const id = uuidv4();
      const orderId = uuidv4();
      const payment = createPayment(id, orderId, 50_000);
      const canceledPayment = createPayment(
        id,
        orderId,
        50_000,
        PaymentMethod.CreditCard,
        PaymentStatus.CANCELED,
      );
      paymentsRepository.findOneBy.mockResolvedValue(payment);
      paymentsRepository.save.mockResolvedValue(canceledPayment);

      const actual = await sut.cancel(id);

      expect(actual.status).toEqual(PaymentStatus.CANCELED);
    });

    it('존재하지 않는 결제 ID로 결제를 취소하려 하면, NotFoundException을 던진다', async () => {
      const nonExistId = uuidv4();
      const cancelOperation = sut.cancel(nonExistId);
      await expect(cancelOperation).rejects.toThrowError(NotFoundException);
    });

    it('이미 [결제취소] 상태이면 BadRequestException을 던진다', async () => {
      const id = uuidv4();
      const orderId = uuidv4();
      const canceledPayment = createPayment(
        id,
        orderId,
        50_000,
        PaymentMethod.CreditCard,
        PaymentStatus.CANCELED,
      );
      paymentsRepository.findOneBy.mockResolvedValue(canceledPayment);

      const cancelOperation = sut.cancel(id);

      await expect(cancelOperation).rejects.toThrowError(BadRequestException);
    });
  });

  describe('approve', () => {
    it('결제 ID로 결제 상태를 [결제완료]로 변경할 수 있다', async () => {
      const id = uuidv4();
      const orderId = uuidv4();
      const payment = createPayment(
        id,
        orderId,
        10_000,
        PaymentMethod.CreditCard,
        PaymentStatus.PENDING,
      );
      paymentsRepository.findOneBy.mockResolvedValue(payment);

      const actual = await sut.approve(id);

      expect(actual.status).toEqual(PaymentStatus.COMPLETED);
    });

    it('존재하지 않는 ID로 결제 상태를 변경 시, NotFoundException을 던진다', async () => {
      const nonExistId = uuidv4();
      const approveOperation = sut.approve(nonExistId);

      await expect(approveOperation).rejects.toThrowError(NotFoundException);
    });

    it('결제 상태가 [결제대기]가 아니면 BadRequestException을 던진다', async () => {
      const id = uuidv4();
      const orderId = uuidv4();
      const payment = createPayment(
        id,
        orderId,
        10_000,
        PaymentMethod.CreditCard,
        PaymentStatus.COMPLETED,
      );
      paymentsRepository.findOneBy.mockResolvedValue(payment);

      const approveOperation = sut.approve(id);

      await expect(approveOperation).rejects.toThrowError(BadRequestException);
    });
  });
});

function createPayment(
  id: string,
  orderId: string,
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
