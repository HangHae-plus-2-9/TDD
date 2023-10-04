import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrdersRepositoryInterface } from './interfaces/orders-repository.interface';
import { OrdersComponent } from './orders.component';

describe('OrdersService', () => {
  let service: OrdersService;
  let mockRepo: OrdersRepositoryInterface;
  let mockComp: Partial<OrdersComponent>;

  beforeEach(async () => {
    mockRepo = {
      doSomethingForOrder: jest.fn(),
      create: jest.fn(),
      all: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      createMany: jest.fn(),
      paginate: jest.fn(),
    };
    mockComp = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: 'OrdersRepositoryInterface',
          useValue: mockRepo,
        },
        {
          provide: OrdersComponent,
          useValue: mockComp,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('모든 값이 정상일 때, 주문이 생성되어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('주문 상품의 ID를 찾을 수 없을 때, 주문이 생성되지 않아야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('주문 수량이 올바르지 않을 때, 주문이 생성되지 않아야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('주문 수량이 재고 수량보다 많을 때, 주문이 생성되지 않아야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('결제 금액이 올바르지 않을 때, 주문이 생성되지 않아야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('결제 수단이 올바르지 않을 때, 주문이 생성되지 않아야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('배송 정보가 올바르지 않을 때, 주문이 생성되지 않아야 한다.', async () => {
      expect(true).toBe(true);
    });
  });

  describe('findOne', () => {
    it('특정 주문을 가져올 수 있어야 한다.', async () => {
      expect(true).toBe(true);
    });
  });

  describe('findAll', () => {
    it('모든 주문을 가져올 수 있어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('구매자의 ID로 주문을 가져올 수 있어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('상품의 ID로 주문을 가져올 수 있어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('올바르지 않은 파라미터로 주문을 가져올 수 없어야 한다.', async () => {
      expect(true).toBe(true);
    });
  });

  describe('getCustomerOrders', () => {
    it('구매자의 ID로 주문을 가져올 수 있어야 한다.', async () => {
      expect(true).toBe(true);
    });
  });

  describe('getSellerOrders', () => {
    it('판매자의 ID로 주문을 가져올 수 있어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('올바르지 않은 파라미터로 주문을 가져올 수 없어야 한다.', async () => {
      expect(true).toBe(true);
    });
  });

  describe('update', () => {
    it('주문을 수정할 수 있어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('수정시 정보가 누락되었을 때, 주문을 수정할 수 없어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('주문 수량이 재고 수량보다 많을 때, 주문을 수정할 수 없어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('올바르지 않은 파라미터로 주문을 수정할 수 없어야 한다.', async () => {
      expect(true).toBe(true);
    });
  });

  describe('remove', () => {
    it('주문을 삭제할 수 있어야 한다.', async () => {
      expect(true).toBe(true);
    });
  });

  describe('cancel', () => {
    it('주문을 취소할 수 있어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('취소된 주문은 취소할 수 없어야 한다.', async () => {
      expect(true).toBe(true);
    });
  });

  describe('ship', () => {
    it('주문을 발송대기 상태로 전환할 수 있어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('발송대기 상태인 주문은 발송대기 상태로 전환할 수 없어야 한다.', async () => {
      expect(true).toBe(true);
    });
  });

  describe('complete', () => {
    it('주문을 완료 상태로 전환할 수 있어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('결제대기 상태인 주문은 완료 상태로 전환할 수 없어야 한다.', async () => {
      expect(true).toBe(true);
    });

    it('완료 상태인 주문은 완료 상태로 전환할 수 없어야 한다.', async () => {
      expect(true).toBe(true);
    });
  });
});
