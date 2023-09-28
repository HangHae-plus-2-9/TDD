import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepositoryInterface } from './interfaces/product-repository.interface';
import { ProductsComponent } from './products.component';

describe('ProductsService', () => {
  let service: ProductsService;
  let mockComp: Partial<ProductsComponent>; // 가짜 컴포넌트 - partial 사용
  let mockRepo: ProductsRepositoryInterface; // 가짜 레포지토리 - interface 사용

  beforeEach(async () => {
    mockComp = {};
    mockRepo = {
      doSomethingForProduct: jest.fn(),
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
        ProductsService,
        { provide: 'ProductsRepositoryInterface', useValue: mockRepo },
        { provide: ProductsComponent, useValue: mockComp },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
