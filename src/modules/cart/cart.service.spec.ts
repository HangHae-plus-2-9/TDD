import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { CartRepositoryInterface } from './interface/cart-repository.interface';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { AsyncLocalStorage } from 'async_hooks';
import { Logger } from '@nestjs/common';

describe('CartService', () => {
  let service: CartService;
  let mockRepo: CartRepositoryInterface;
  let mockCartItemRepo: CartRepositoryInterface;

  beforeEach(async () => {
    mockRepo = {} as any;
    mockCartItemRepo = {} as any;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        WinstonContextLogger,
        AsyncLocalStorage,
        CartService,
        {
          provide: 'CartRepositoryInterface',
          useValue: mockRepo,
        },
        {
          provide: 'CartItemRepositoryInterface',
          useValue: mockCartItemRepo,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
