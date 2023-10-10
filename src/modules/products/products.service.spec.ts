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
  //post 하기 전 유효성 검사(통과케이스)
  //   it('should validate product upload and return true', async() => {
  //     const ProductInfo = { id: 1, name: 'Sample Product', price: 100 };
  //     mockRepo.create.mockResolvedValue(storedProductInfo);

  //     const isValid = await service.add_product_validation(storedProductInfo)
  //     expect(isValid).toBe(true);
  //   });
  //   //post 유효성검사 : 제품 이름이 빈 문자열이면 validation Error
  //   it('should throw an error if product name is empty', async() => {
  //     const productWithEmptyName = { name: '', price: 100 };
  //     const storedProductInfo = { id: 1, ...productWithEmptyName };
  //     mockRepo.create.mockResolvedValue(storedProductInfo);

  //     await expect(
  //       service.add_product_validation(storedProductInfo),
  //     ).rejects.toThrow('Validation Error: Product name is required.');
  // });
  //   // post 유효성검사 : 가격이 음수면 validation Error
  //   it('should throw an error if product price is minus', async() => {
  //     const productWithMinusPrice = {name: 'Sample Product', price: -1};
  //     const storedProductInfo = {id :1, ...productWithMinusPrice}
  //     mockRepo.create.mockResolvedValue(storedProductInfo);

  //     await expect(
  //       service.add_product_validation(storedProductInfo),
  //     ).rejects.toThrow('Validation Error:product price is minus');
  //   });
  //   // post 유효성검사 : 가격이 정수가 아니면 validation Error
  //   it('should throw an error if product price is not a natural number', async() => {
  //     const productWithDecimalPrice = {name: 'Sample Product', price: 100.5};
  //     const storedProductInfo = {id :1, ...productWithDecimalPrice}
  //     mockRepo.create.mockResolvedValue(storedProductInfo);

  //     await expect(
  //       service.add_product_validation(storedProductInfo),
  //     ).rejects.toThrow('Validation Error:product price is not natural number');
  //   });
  //   // post 유효성검사 : description 멘트가 너무 길면 validation Error
  //   it('should throw an error if product description is too long', async() => {
  //     const longDescription = 'a'.repeat(1001); // 1000자 이상이면 에러라고 가정
  //     const productWithLongDescription = { name: 'Sample Product', price: 100, description: longDescription };
  //     const storedProductInfo = { id: 1, ...productWithLongDescription };
  //     mockRepo.create.mockResolvedValue(storedProductInfo);

  //     await expect(
  //       service.add_product_validation(storedProductInfo),
  //     ).rejects.toThrow('Validation Error: Product description is too long.');
  // });
  //   // post 유효성검사: 카테고리가 실제로 데이터베이스 내에 존재하지 않을때 에러 발생
  //   it('should throw an error if product category does not exist', async() => {
  //     const productWithNonExistingCategory = {
  //       name: 'Sample Product',
  //       price: 100,
  //       category: 'UnknownCategory',
  //     };
  //     mockRepo.create.mockResolvedValue(productWithNonExistingCategory);

  //     await expect(
  //       service.add_product_validation(productWithNonExistingCategory),
  //     ).rejects.toThrow('Validation Error: Provided category does not exist.');
  // });
});
