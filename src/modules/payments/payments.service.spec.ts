import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Payments } from '@/modules/payments/entity/payments.entity';
import { PaymentMethod } from '@/modules/payments/enum/payment-method.enum';
import { OrderEntity } from '@/modules/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

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
});

function createPayment(
  id: number,
  orderId: number,
  amount: number,
  method: PaymentMethod = PaymentMethod.CreditCard,
) {
  // order
  const order = new OrderEntity();
  order.id = orderId;
  // payment
  const payment = new Payments();
  payment.id = id;
  payment.method = method;
  payment.amount = amount;
  payment.order = order;
  return payment;
}
