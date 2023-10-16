import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrderItemsRepository } from './order-items.repository';
import { ProductNotFoundException } from '@/common/exceptions';

const orderItems = [
  { productId: 1, quantity: 1, price: 30000 },
  { productId: 2, quantity: 2, price: 40000 },
];

const createOrderDto = {
  customerId: 1,
  paymentMethod: 'CREDIT_CARD',
  amount: null,
  paidAt: null,
  canceledAt: null,
  courierName: 'CJ대한통운',
  isPrepaid: true,
  invoiceNumber: '123456789',
  shippingAddress: '서울시 강남구',
  shippingReceiver: '홍길동',
  shippingReceiverPhone: '010-1234-5678',
  shippingFee: 2500,
  departedAt: null,
  arrivedAt: null,
  orderItems,
};
const orderItemEntities = [
  { id: 1, productId: 1, quantity: 1, price: 30000 },
  { id: 2, productId: 2, quantity: 2, price: 40000 },
];
const orderEntity = {
  id: 1,
  customer_id: createOrderDto.customerId,
  payment_method: createOrderDto.paymentMethod,
  amount: createOrderDto.amount,
  paid_at: createOrderDto.paidAt,
  canceled_at: createOrderDto.canceledAt,
  courier_name: createOrderDto.courierName,
  is_prepaid: createOrderDto.isPrepaid,
  invoice_number: createOrderDto.invoiceNumber,
  shipping_address: createOrderDto.shippingAddress,
  shipping_receiver: createOrderDto.shippingReceiver,
  shipping_receiver_phone: createOrderDto.shippingReceiverPhone,
  shipping_fee: createOrderDto.shippingFee,
  departed_at: createOrderDto.departedAt,
  arrived_at: createOrderDto.arrivedAt,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

describe('OrdersService', () => {
  let service: OrdersService;
  let stubOrderRepo: Partial<OrdersRepository>;
  let stubOrderItemRepo: Partial<OrderItemsRepository>;

  beforeEach(async () => {
    stubOrderRepo = {
      create: jest.fn(),
      all: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    stubOrderItemRepo = {
      createManyWithOrderId: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useValue: stubOrderRepo,
        },
        {
          provide: OrderItemsRepository,
          useValue: stubOrderItemRepo,
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
      // given
      stubOrderRepo.create = jest.fn().mockReturnValue(orderEntity);
      stubOrderItemRepo.createManyWithOrderId = jest
        .fn()
        .mockReturnValue(orderItemEntities);

      // when
      const result = await service.create(createOrderDto);

      // then
      // this two lines are not so ideal because these are implementation details.
      expect(stubOrderRepo.create).toBeCalledTimes(1);
      expect(stubOrderItemRepo.createManyWithOrderId).toBeCalledTimes(1);

      // this line is ideal because this is the behavior that we want.
      expect(result).toEqual({ ...orderEntity, orderItems: orderItemEntities });
    });

    it('주문 상품의 ID를 찾을 수 없을 때, 주문이 생성되지 않아야 한다.', async () => {
      // given
      const invalidOrderItems = [
        { productId: 9999999999, quantity: 1, price: 30000 },
      ];
      const invalidCreateOrderDto = {
        ...createOrderDto,
        orderItems: invalidOrderItems,
      };

      // when & then
      await expect(service.create(invalidCreateOrderDto)).rejects.toThrowError(
        ProductNotFoundException
      );
    });

    it('주문 수량이 올바르지 않을 때, 주문이 생성되지 않아야 한다.', async () => {
      // given
      const invalidOrderItems = [{ productId: 1, quantity: -1, price: 30000 }];
      const invalidCreateOrderDto = {
        ...createOrderDto,
        orderItems: invalidOrderItems,
      };

      // when & then
      await expect(service.create(invalidCreateOrderDto)).rejects.toThrow(
        'Quantity must be greater than 0',
      );
    });

    it('주문 수량이 재고 수량보다 많을 때, 주문이 생성되지 않아야 한다.', async () => {
      // given
      const invalidOrderItems = [
        { productId: 1, quantity: 999999, price: 30000 },
      ];
      const invalidCreateOrderDto = {
        ...createOrderDto,
        orderItems: invalidOrderItems,
      };

      // when & then
      await expect(service.create(invalidCreateOrderDto)).rejects.toThrow(
        'Quantity must be less than product quantity',
      );
    });

    it.todo('결제 금액이 올바르지 않을 때, 주문이 생성되지 않아야 한다.');

    it.todo('결제 수단이 올바르지 않을 때, 주문이 생성되지 않아야 한다.');

    it.todo('배송 정보가 올바르지 않을 때, 주문이 생성되지 않아야 한다.');
  });

  describe('findOne', () => {
    it('특정 주문을 가져올 수 있어야 한다.', async () => {
      // given
      stubOrderRepo.findById = jest.fn().mockReturnValue(orderEntity);
      stubOrderItemRepo.findByOrderId = jest
        .fn()
        .mockReturnValue(orderItemEntities);

      // when
      const result = await service.findOne(1);

      // then
      // implementation details
      expect(stubOrderRepo.findById).toBeCalledTimes(1);
      expect(stubOrderItemRepo.findByOrderId).toBeCalledTimes(1);
      // behavior
      expect(result).toEqual({ ...orderEntity, orderItems: orderItemEntities });
    });
  });

  describe('findAll', () => {
    it('모든 주문을 가져올 수 있어야 한다.', async () => {
      // given
      stubOrderRepo.all = jest.fn().mockReturnValue([orderEntity]);
      stubOrderItemRepo.findByOrderId = jest
        .fn()
        .mockReturnValue(orderItemEntities);

      // when
      const result = await service.findAll();

      // then
      // implementation details
      expect(stubOrderRepo.all).toBeCalledTimes(1);
      // behavior
      expect(result).toEqual([
        { ...orderEntity, orderItems: orderItemEntities },
      ]);
    });

    it.todo('구매자의 ID로 주문을 가져올 수 있어야 한다.');

    it.todo('상품의 ID로 주문을 가져올 수 있어야 한다.');

    it.todo('올바르지 않은 파라미터로 주문을 가져올 수 없어야 한다.');
  });

  describe('getCustomerOrders', () => {
    it.todo('구매자의 ID로 주문을 가져올 수 있어야 한다.');
  });

  describe('getSellerOrders', () => {
    it.todo('판매자의 ID로 주문을 가져올 수 있어야 한다.');

    it.todo('올바르지 않은 파라미터로 주문을 가져올 수 없어야 한다.');
  });

  describe('update', () => {
    it.todo('주문을 수정할 수 있어야 한다.');

    it.todo('수정시 정보가 누락되었을 때, 주문을 수정할 수 없어야 한다.');

    it.todo('주문 수량이 재고 수량보다 많을 때, 주문을 수정할 수 없어야 한다.');

    it.todo('올바르지 않은 파라미터로 주문을 수정할 수 없어야 한다.');
  });

  describe('remove', () => {
    it.todo('주문을 삭제할 수 있어야 한다.');
  });

  describe('cancel', () => {
    it.todo('주문을 취소할 수 있어야 한다.');

    it.todo('취소된 주문은 취소할 수 없어야 한다.');
  });

  describe('ship', () => {
    it.todo('주문을 발송대기 상태로 전환할 수 있어야 한다.');

    it.todo('발송대기 상태인 주문은 발송대기 상태로 전환할 수 없어야 한다.');
  });

  describe('complete', () => {
    it.todo('주문을 완료 상태로 전환할 수 있어야 한다.');

    it.todo('결제대기 상태인 주문은 완료 상태로 전환할 수 없어야 한다.');

    it.todo('완료 상태인 주문은 완료 상태로 전환할 수 없어야 한다.');
  });
});
