import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrderItemsRepository } from './order-items.repository';
import {
  OrderNotFoundException,
  ProductNotFoundException,
} from '@/common/exceptions';
import { PAYMENT_METHOD } from '@/common/resources';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { ProductsService } from '../products/products.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItemModel } from './models/order-item.model';
import { cloneDeep } from 'lodash';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { Logger } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

const customerId = 1;

const dummyProductModels = [
  { id: 1, name: '테스트 상품 1', price: 30000, stock: 10 },
  { id: 2, name: '테스트 상품 2', price: 40000, stock: 10 },
];

const orderItems: CreateOrderItemDto[] = [
  { productId: 1, quantity: 1, price: 30000 },
  { productId: 2, quantity: 2, price: 40000 },
];

const createPaymentDto = {
  method: PAYMENT_METHOD.CREDIT_CARD,
  amount: null,
  paidAt: null,
  canceledAt: null,
};

const createShippingDto = {
  courierName: null,
  invoiceNumber: null,
  address: '서울시 강남구',
  receiver: '홍길동',
  receiverPhone: '010-1234-5678',
  departedAt: null,
  arrivedAt: null,
} as unknown as CreateShippingDto;

const createOrderDto = {
  customerId: 1,
  createPaymentDto,
  createShippingDto,
  canceledAt: null,
  orderItems,
};
const orderItemEntities = [
  { id: 1, order_id: 1, product_id: 1, quantity: 1, price: 30000 },
  { id: 2, order_id: 1, product_id: 2, quantity: 2, price: 40000 },
];
const orderItemModels: OrderItemModel[] = [
  { id: 1, orderId: 1, productId: 1, quantity: 1, price: 30000 },
  { id: 2, orderId: 1, productId: 2, quantity: 2, price: 40000 },
];
const orderEntity = {
  id: 1,
  customer_id: createOrderDto.customerId,
  payment_method: createOrderDto.createPaymentDto.method,
  amount: createOrderDto.createPaymentDto.amount,
  paid_at: createOrderDto.createPaymentDto.paidAt,
  courier_name: createOrderDto.createShippingDto.courierName,
  invoice_number: createOrderDto.createShippingDto.invoiceNumber,
  shipping_address: createOrderDto.createShippingDto.address,
  shipping_receiver: createOrderDto.createShippingDto.receiver,
  shipping_receiver_phone: createOrderDto.createShippingDto.receiverPhone,
  departed_at: createOrderDto.createShippingDto.departedAt,
  arrived_at: createOrderDto.createShippingDto.arrivedAt,
  canceled_at: createOrderDto.canceledAt,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};
const orderModel = {
  id: 1,
  customerId: orderEntity.customer_id,
  payment: {
    method: orderEntity.payment_method,
    amount: orderEntity.amount,
    paidAt: orderEntity.paid_at,
    canceledAt: orderEntity.canceled_at,
  },
  shipping: {
    courierName: orderEntity.courier_name,
    invoiceNumber: orderEntity.invoice_number,
    address: orderEntity.shipping_address,
    receiver: orderEntity.shipping_receiver,
    receiverPhone: orderEntity.shipping_receiver_phone,
    departedAt: orderEntity.departed_at,
    arrivedAt: orderEntity.arrived_at,
    canceledAt: orderEntity.canceled_at,
  },
  canceledAt: orderEntity.canceled_at,
  orderItems: orderItemModels,
};

describe('OrdersService', () => {
  let service: OrdersService;
  let stubProductsService: Partial<ProductsService>;
  let stubOrderRepo: Partial<OrdersRepository>;
  let stubOrderItemRepo: Partial<OrderItemsRepository>;

  beforeEach(async () => {
    stubProductsService = {
      findOne: jest.fn().mockImplementation((id) => {
        return dummyProductModels.find((product) => product.id === id);
      }),
    };
    stubOrderRepo = {
      create: jest.fn(),
      all: jest.fn(),
      getByOrderId: jest.fn(),
      update: jest.fn(),
      removeByOrderId: jest.fn(),
    };
    stubOrderItemRepo = {
      createManyWithOrderId: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        WinstonContextLogger,
        AsyncLocalStorage,
        OrdersService,
        {
          provide: ProductsService,
          useValue: stubProductsService,
        },
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
    stubProductsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('모든 값이 정상일 때, 주문이 생성되고 물품 재고를 삭감해야 한다.', async () => {
      // given
      stubOrderRepo.create = jest.fn().mockReturnValue(orderEntity);
      stubOrderItemRepo.createManyWithOrderId = jest
        .fn()
        .mockReturnValue(orderItemEntities);
      stubProductsService.subStock = jest.fn();

      // when
      const result = await service.create(
        customerId,
        createPaymentDto,
        createShippingDto,
        orderItems,
      );

      // then
      // this two lines are not so ideal because these are implementation details.
      expect(stubOrderRepo.create).toBeCalledTimes(1);
      expect(stubOrderItemRepo.createManyWithOrderId).toBeCalledTimes(1);

      // this line is ideal because this is the behavior that we want.
      expect(result).toEqual({
        ...orderEntity,
        orderItems: orderItemEntities,
      });
      orderItems.forEach((item, index) => {
        expect(stubProductsService.subStock).toHaveBeenNthCalledWith(
          index + 1,
          item.productId,
          item.quantity,
        );
      });
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
      await expect(
        service.create(
          invalidCreateOrderDto.customerId,
          invalidCreateOrderDto.createPaymentDto,
          invalidCreateOrderDto.createShippingDto,
          invalidCreateOrderDto.orderItems,
        ),
      ).rejects.toThrowError(ProductNotFoundException);
    });

    it('주문 수량이 올바르지 않을 때, 주문이 생성되지 않아야 한다.', async () => {
      // given
      const invalidOrderItems = [{ productId: 1, quantity: -1, price: 30000 }];
      const invalidCreateOrderDto = {
        ...createOrderDto,
        orderItems: invalidOrderItems,
      };

      // when & then
      await expect(
        service.create(
          invalidCreateOrderDto.customerId,
          invalidCreateOrderDto.createPaymentDto,
          invalidCreateOrderDto.createShippingDto,
          invalidCreateOrderDto.orderItems,
        ),
      ).rejects.toThrow('Quantity must be greater than 0');
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
      await expect(
        service.create(
          invalidCreateOrderDto.customerId,
          invalidCreateOrderDto.createPaymentDto,
          invalidCreateOrderDto.createShippingDto,
          invalidCreateOrderDto.orderItems,
        ),
      ).rejects.toThrow('Quantity must be less than product quantity');
    });

    it('주문 아이템이 없는 경우 주문이 생성되지 않아야 한다.', async () => {
      // given
      const invalidOrderItems = [];
      const invalidCreateOrderDto = {
        ...createOrderDto,
        orderItems: invalidOrderItems,
      };

      // when & then
      await expect(
        service.create(
          invalidCreateOrderDto.customerId,
          invalidCreateOrderDto.createPaymentDto,
          invalidCreateOrderDto.createShippingDto,
          invalidCreateOrderDto.orderItems,
        ),
      ).rejects.toThrow('Order items must be exist');
    });
  });

  describe('findOne', () => {
    it('특정 주문을 가져올 수 있어야 한다.', async () => {
      // given
      stubOrderRepo.getByOrderId = jest.fn().mockReturnValue(orderEntity);
      stubOrderItemRepo.getByOrderId = jest
        .fn()
        .mockReturnValue(orderItemEntities);

      // when
      const result = await service.findOne(1);

      // then
      // implementation details
      expect(stubOrderRepo.getByOrderId).toBeCalledTimes(1);
      expect(stubOrderItemRepo.getByOrderId).toBeCalledTimes(1);
      // behavior
      expect(result).toEqual({
        ...orderEntity,
        orderItems: orderItemEntities,
      });
    });
  });

  describe('findAll', () => {
    it('모든 주문을 가져올 수 있어야 한다.', async () => {
      // given
      stubOrderRepo.all = jest.fn().mockReturnValue([orderEntity]);
      stubOrderItemRepo.getByOrderId = jest
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
    it('주문의 결제수단을 수정할 수 있어야 한다.', async () => {
      // given
      const newPaymentMethod = PAYMENT_METHOD.BANK_TRANSFER;
      stubOrderItemRepo.updateManyWithOrderId = jest.fn().mockReturnValue(
        orderItems.map((item, idx) => {
          return { id: idx + 1, orderId: 1, ...item };
        }),
      );
      stubProductsService.findOne = jest
        .fn()
        .mockReturnValue(dummyProductModels[0]);
      stubOrderRepo.getByOrderId = jest
        .fn()
        .mockReturnValue(cloneDeep(orderModel));
      stubOrderRepo.update = jest.fn().mockReturnValue({
        ...orderModel,
        payment: {
          ...orderModel.payment,
          method: newPaymentMethod,
        },
      });

      // when
      const result = await service.update(
        customerId,
        { method: newPaymentMethod },
        { ...createShippingDto },
        [...orderItems],
      );

      // then
      // implementation details
      expect(stubOrderRepo.getByOrderId).toBeCalledTimes(1);
      expect(stubOrderItemRepo.updateManyWithOrderId).toBeCalledTimes(1);
      // behavior
      expect(result).toEqual({
        ...orderModel,
        payment: {
          ...orderModel.payment,
          method: newPaymentMethod,
        },
      });
    });

    it('주문의 배송지 정보를 수정할 수 있어야 한다.', async () => {
      // given
      const newShippingAddress = '테스트 주소';
      const newShippingReceiver = '테스트 이름';
      const newShippingReceiverPhone = '010-0000-0000';
      stubOrderItemRepo.updateManyWithOrderId = jest.fn().mockReturnValue(
        orderItems.map((item, idx) => {
          return { id: idx + 1, orderId: 1, ...item };
        }),
      );
      stubProductsService.findOne = jest
        .fn()
        .mockReturnValue(dummyProductModels[0]);
      stubOrderRepo.getByOrderId = jest
        .fn()
        .mockReturnValue(cloneDeep(orderModel));
      stubOrderRepo.update = jest.fn().mockReturnValue({
        ...orderModel,
        shipping: {
          ...orderModel.shipping,
          address: newShippingAddress,
          receiver: newShippingReceiver,
          receiverPhone: newShippingReceiverPhone,
        },
      });

      // when
      const result = await service.update(
        customerId,
        { ...createPaymentDto },
        {
          address: newShippingAddress,
          receiver: newShippingReceiver,
          receiverPhone: newShippingReceiverPhone,
        },
        [...orderItems],
      );

      // then
      // implementation details
      expect(stubOrderRepo.getByOrderId).toBeCalledTimes(1);
      expect(stubOrderItemRepo.updateManyWithOrderId).toBeCalledTimes(1);
      // behavior
      expect(result).toEqual({
        ...orderModel,
        shipping: {
          ...orderModel.shipping,
          address: newShippingAddress,
          receiver: newShippingReceiver,
          receiverPhone: newShippingReceiverPhone,
        },
      });
    });

    it('주문의 상품 수량을 수정할 수 있어야 한다.', async () => {
      // given
      const newOrderItems = [
        { productId: 1, quantity: 2, price: 30000 },
        { productId: 2, quantity: 3, price: 40000 },
      ];
      const newOrderItemModels = newOrderItems.map((item, idx) => {
        return { id: idx + 1, orderId: 1, ...item };
      });
      stubOrderItemRepo.updateManyWithOrderId = jest
        .fn()
        .mockReturnValue(newOrderItemModels);
      stubProductsService.findOne = jest
        .fn()
        .mockReturnValue(dummyProductModels[0]);
      stubOrderRepo.getByOrderId = jest
        .fn()
        .mockReturnValue(cloneDeep(orderModel));
      stubOrderRepo.update = jest.fn().mockImplementation((id, orderModel) => {
        return { ...orderModel, orderItems: newOrderItemModels };
      });

      // when
      const result = await service.update(
        customerId,
        { ...createPaymentDto },
        { ...createShippingDto },
        newOrderItems,
      );

      // then
      // implementation details
      expect(stubOrderRepo.getByOrderId).toBeCalledTimes(1);
      expect(stubOrderItemRepo.updateManyWithOrderId).toBeCalledTimes(1);
      // behavior
      expect(result).toEqual({
        ...orderModel,
        orderItems: newOrderItemModels,
        payment: {
          ...orderModel.payment,
          amount: newOrderItemModels.reduce(
            (acc, cur) => acc + cur.price * cur.quantity,
            0,
          ),
        },
      });
    });

    it('주문 수량이 재고 수량보다 많을 때, 주문을 수정할 수 없어야 한다.', async () => {
      // given
      const invalidOrderItems = [
        { productId: 1, quantity: 999999, price: 30000 },
      ];
      const invalidCreateOrderDto = {
        ...createOrderDto,
        orderItems: invalidOrderItems,
      };

      // when & then
      await expect(
        service.update(
          invalidCreateOrderDto.customerId,
          invalidCreateOrderDto.createPaymentDto,
          invalidCreateOrderDto.createShippingDto,
          invalidCreateOrderDto.orderItems,
        ),
      ).rejects.toThrow('Quantity must be less than product quantity');
    });
  });

  describe('remove', () => {
    it('주문을 취소할 수 있어야 한다.', async () => {
      // given
      stubOrderRepo.getByOrderId = jest.fn().mockReturnValue(orderEntity);
      stubOrderRepo.removeByOrderId = jest.fn().mockReturnValue(orderEntity);
      stubOrderItemRepo.getByOrderId = jest
        .fn()
        .mockReturnValue(orderItemEntities);
      stubOrderItemRepo.removeByOrderId = jest
        .fn()
        .mockReturnValue(orderItemEntities);

      // when
      const result = await service.remove(1);

      // then
      // implementation details
      expect(stubOrderRepo.getByOrderId).toBeCalledTimes(1);
      expect(stubOrderRepo.removeByOrderId).toBeCalledTimes(1);
      expect(stubOrderItemRepo.getByOrderId).toBeCalledTimes(1);
      expect(stubOrderItemRepo.removeByOrderId).toBeCalledTimes(1);
      // behavior
      expect(result).toEqual({
        ...orderEntity,
        orderItems: orderItemEntities,
      });
    });

    it('취소된 주문은 취소할 수 없어야 한다.', async () => {
      // given
      stubOrderRepo.getByOrderId = jest.fn().mockReturnValue(undefined);

      // when & then
      await expect(service.remove(1)).rejects.toThrowError(
        OrderNotFoundException,
      );
    });
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
