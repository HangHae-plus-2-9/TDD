import { Test, TestingModule } from '@nestjs/testing';
import { OrdersComponent } from './orders.component';
import { OrdersRepositoryInterface } from './interfaces/orders-repository.interface';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let mockRepo: OrdersRepositoryInterface;

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersComponent,
        {
          provide: 'OrdersRepositoryInterface',
          useValue: mockRepo,
        },
      ],
    }).compile();

    component = module.get<OrdersComponent>(OrdersComponent);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
