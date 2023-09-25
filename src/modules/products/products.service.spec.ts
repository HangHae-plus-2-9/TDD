import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepositoryInterface } from './interfaces/product-repository.interface';
import { ProductsComponent } from './products.component';
import { ProductsRepository } from './products.repository';

describe('ProductsService', () => {
  let service: ProductsService;
  let comp: Partial<ProductsComponent>;
  let repo: ProductsRepositoryInterface;

  beforeEach(async () => {
    comp = {};
    repo = {
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
        { provide: ProductsRepository, useValue: repo },
        { provide: ProductsComponent, useValue: comp },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
