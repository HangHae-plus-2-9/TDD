import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductModel } from './models/product.model';
import { ProductNotFoundException } from '@/common/exceptions';

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
      const createProductDto = new CreateProductDto();
      createProductDto.sellerId = 1;
      createProductDto.name = 'product1';
      createProductDto.categoryName = 'category';
      createProductDto.description = 'description';
      createProductDto.price = 10000;
      createProductDto.stock = 100;

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

  describe('findAll', () => {
    it('상품이 하나도 없는 경우 빈 배열을 반환한다.', async () => {
      // given
      mockRepo.all = jest.fn().mockResolvedValue([]);

      // when
      const products = await service.findAll();

      // then
      expect(products).toEqual([]);
    });

    it('상품이 하나 이상 있는 경우 상품 목록을 반환한다.', async () => {
      // given
      const product1 = {
        id: 1,
        sellerId: 1,
        name: 'product1',
        categoryName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      const product2 = {
        id: 2,
        sellerId: 1,
        name: 'product2',
        categoryName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      mockRepo.all = jest.fn().mockResolvedValue([product1, product2]);

      // when
      const products = await service.findAll();

      // then
      expect(products).toEqual([product1, product2]);
    });
  });

  describe('findOne', () => {
    it('해당 id의 상품이 없는 경우 undefined를 반환한다.', async () => {
      // given
      mockRepo.findById = jest.fn().mockResolvedValue(undefined);

      // when
      const product = await service.findOne(1);

      // then
      expect(product).toBeUndefined();
    });

    it('해당 id의 상품이 있는 경우 상품을 반환한다.', async () => {
      // given
      const product = {
        id: 1,
        sellerId: 1,
        name: 'product1',
        categoryName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      mockRepo.findById = jest.fn().mockResolvedValue(product);

      // when
      const foundProduct = await service.findOne(1);

      // then
      expect(foundProduct).toEqual(product);
    });
  });

  describe('update', () => {
    it('해당 id의 상품이 없는 경우 에러를 발생시킨다.', async () => {
      // given
      const updateProductDto = new CreateProductDto();
      updateProductDto.name = 'product1-update';

      mockRepo.findById = jest.fn().mockResolvedValue(undefined);

      // when
      const updateProduct = service.update(1, updateProductDto);

      // then
      await expect(updateProduct).rejects.toThrowError(
        ProductNotFoundException,
      );
    });

    it('해당 id의 상품이 있는 경우 상품을 수정하고 수정된 상품을 반환한다.', async () => {
      // given
      const updateProductDto = new CreateProductDto();
      updateProductDto.name = 'product1-update';
      const product = {
        id: 1,
        sellerId: 1,
        name: 'product1',
        categoryName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      mockRepo.findById = jest.fn().mockResolvedValue(product);
      mockRepo.update = jest.fn().mockResolvedValue({
        ...product,
        ...updateProductDto,
      });

      // when
      const updatedProduct = await service.update(1, updateProductDto);

      // then
      expect(updatedProduct).toEqual({
        ...product,
        ...updateProductDto,
      });
    });
  });

  describe('remove', () => {
    it('해당 id의 상품이 없는 경우 에러를 발생시킨다.', async () => {
      // given
      mockRepo.findById = jest.fn().mockResolvedValue(undefined);

      // when
      const removeProduct = service.remove(1);

      // then
      await expect(removeProduct).rejects.toThrowError(
        ProductNotFoundException,
      );
    });

    it('해당 id의 상품이 있는 경우 상품을 삭제하고 삭제된 상품을 반환한다.', async () => {
      // given
      const product = {
        id: 1,
        sellerId: 1,
        name: 'product1',
        categoryName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      mockRepo.findById = jest.fn().mockResolvedValue(product);
      mockRepo.remove = jest.fn().mockResolvedValue(product);

      // when
      const removedProduct = await service.remove(1);

      // then
      expect(removedProduct).toEqual(product);
    });
  });
});
