import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Logger } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let mockService: Partial<PaymentsService>;

  beforeEach(async () => {
    mockService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        Logger,
        WinstonContextLogger,
        AsyncLocalStorage,
        {
          provide: PaymentsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
