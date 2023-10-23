import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { AsyncLocalStorage } from 'async_hooks';
import { Logger } from '@nestjs/common';
import { CartItemsRepository } from './cart-items.repository';
import { CartsRepository } from './carts.repository';

describe('CartsService', () => {
  let service: CartsService;
  let mockRepo: Partial<CartsRepository>;
  let mockCartsItemRepo: Partial<CartItemsRepository>;

  beforeEach(async () => {
    mockRepo = {};
    mockCartsItemRepo = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        WinstonContextLogger,
        AsyncLocalStorage,
        CartsService,
        {
          provide: CartsRepository,
          useValue: mockRepo,
        },
        {
          provide: CartItemsRepository,
          useValue: mockCartsItemRepo,
        },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
