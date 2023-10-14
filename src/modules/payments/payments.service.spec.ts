import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Payments } from '@/modules/payments/entity/payments.entity';
import { PaymentMethod } from '@/modules/payments/enum/payment-method.enum';
import { OrderEntity } from '@/modules/orders/entities/order.entity';
import { Repository } from 'typeorm';

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

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('정상적인 Payments 생성 요청 시, Payments가 생성된다', async () => {
      // given
      const orderId = 5;
      const amount = 2_000;
      const payment = createPayment(orderId, amount);
      const expected = createPayment(orderId, amount);
      paymentsRepository.create.mockReturnValue(payment);

      // when
      const actual = await sut.create(orderId, amount);

      // then
      expect(actual).toEqual(expected);
    });
  });
});

function createPayment(
  orderId: number,
  amount: number,
  method: PaymentMethod = PaymentMethod.CreditCard,
) {
  // order
  const order = new OrderEntity();
  order.id = orderId;

  // payment
  const payment = new Payments();
  payment.method = method;
  payment.amount = amount;
  payment.order = order;
  return payment;
}
