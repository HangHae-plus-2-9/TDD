import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { AsyncLocalStorage } from 'async_hooks';
import { Logger } from '@nestjs/common';
import { CartItemRepository } from './cart-item.repository';
import { CartRepository } from './cart.repository';

describe('CartService', () => {
  let service: CartService;
  let mockRepo: Partial<CartRepository>;
  let mockCartItemRepo: Partial<CartItemRepository>;

  beforeEach(async () => {
    mockRepo = {};
    mockCartItemRepo = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        WinstonContextLogger,
        AsyncLocalStorage,
        CartService,
        {
          provide: CartRepository,
          useValue: mockRepo,
        },
        {
          provide: CartItemRepository,
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
