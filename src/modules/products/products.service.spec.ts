import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductModel } from './models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let mockRepo: Partial<ProductsRepository>;

  beforeEach(async () => {
    mockRepo = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('모든 값이 정상적으로 주어진 경우 상품을 생성하고 생성된 상품을 반환한다.', async () => {
      // given
      const createProductDto: CreateProductDto = {
        sellerId: 1,
        name: 'product1',
        categoryName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      mockRepo.create = jest.fn().mockResolvedValue({
        id: 1,
        ...createProductDto,
      });

      // when
      const createdProduct = await service.create(
        ProductModel.fromDto(createProductDto),
      );

      // then
      expect(createdProduct).toEqual({
        id: 1,
        ...createProductDto,
      });
    });
  });

  //post 하기 전 유효성 검사(통과케이스)
  // it('should validate product upload and return true', async () => {
  //   const ProductInfo = { id: 1, name: 'Sample Product', price: 100 };
  //   mockRepo.create.mockResolvedValue(storedProductInfo);

  //   const isValid = await service.add_product_validation(storedProductInfo);
  //   expect(isValid).toBe(true);
  // });
  // //post 유효성검사 : 제품 이름이 빈 문자열이면 validation Error
  // it('should throw an error if product name is empty', async () => {
  //   const productWithEmptyName = { name: '', price: 100 };
  //   const storedProductInfo = { id: 1, ...productWithEmptyName };
  //   mockRepo.create.mockResolvedValue(storedProductInfo);

  //   await expect(
  //     service.add_product_validation(storedProductInfo),
  //   ).rejects.toThrow('Validation Error: Product name is required.');
  // });
  // // post 유효성검사 : 가격이 음수면 validation Error
  // it('should throw an error if product price is minus', async () => {
  //   const productWithMinusPrice = { name: 'Sample Product', price: -1 };
  //   const storedProductInfo = { id: 1, ...productWithMinusPrice };
  //   mockRepo.create.mockResolvedValue(storedProductInfo);

  //   await expect(
  //     service.add_product_validation(storedProductInfo),
  //   ).rejects.toThrow('Validation Error:product price is minus');
  // });
  // // post 유효성검사 : 가격이 정수가 아니면 validation Error
  // it('should throw an error if product price is not a natural number', async () => {
  //   const productWithDecimalPrice = { name: 'Sample Product', price: 100.5 };
  //   const storedProductInfo = { id: 1, ...productWithDecimalPrice };
  //   mockRepo.create.mockResolvedValue(storedProductInfo);

  //   await expect(
  //     service.add_product_validation(storedProductInfo),
  //   ).rejects.toThrow('Validation Error:product price is not natural number');
  // });
  // // post 유효성검사 : description 멘트가 너무 길면 validation Error
  // it('should throw an error if product description is too long', async () => {
  //   const longDescription = 'a'.repeat(1001); // 1000자 이상이면 에러라고 가정
  //   const productWithLongDescription = {
  //     name: 'Sample Product',
  //     price: 100,
  //     description: longDescription,
  //   };
  //   const storedProductInfo = { id: 1, ...productWithLongDescription };
  //   mockRepo.create.mockResolvedValue(storedProductInfo);

  //   await expect(
  //     service.add_product_validation(storedProductInfo),
  //   ).rejects.toThrow('Validation Error: Product description is too long.');
  // });
  // // post 유효성검사: 카테고리가 실제로 데이터베이스 내에 존재하지 않을때 에러 발생
  // it('should throw an error if product category does not exist', async () => {
  //   const productWithNonExistingCategory = {
  //     name: 'Sample Product',
  //     price: 100,
  //     category: 'UnknownCategory',
  //   };
  //   mockRepo.create.mockResolvedValue(productWithNonExistingCategory);

  //   await expect(
  //     service.add_product_validation(productWithNonExistingCategory),
  //   ).rejects.toThrow('Validation Error: Provided category does not exist.');
  // });
});
