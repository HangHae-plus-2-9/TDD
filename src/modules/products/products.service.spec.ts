import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductSpec } from './models/product-spec.model';
import { ProductNotFoundException } from '@/common/exceptions';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { AsyncLocalStorage } from 'async_hooks';
import { Logger } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let mockRepo: Partial<ProductsRepository>;

  beforeEach(async () => {
    mockRepo = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        WinstonContextLogger,
        AsyncLocalStorage,
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
      createProductDto.catName = 'category';
      createProductDto.desc = 'description';
      createProductDto.price = 10000;
      createProductDto.stock = 100;

      mockRepo.create = jest.fn().mockResolvedValue({
        id: 1,
        ...createProductDto,
      });

      // when
      const createdProduct = await service.create(
        createProductDto.sellerId,
        createProductDto as unknown as ProductSpec,
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
      mockRepo.all = jest.fn().mockResolvedValue({ total: 0, data: [] });

      // when
      const products = await service.findAll();

      // then
      expect(products).toEqual({ data: [], total: 0 });
    });

    it('상품이 하나 이상 있는 경우 상품 목록을 반환한다.', async () => {
      // given
      const productModel1 = {
        id: 1,
        sellerId: 1,
        name: 'product1',
        catName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      const productModel2 = {
        id: 2,
        sellerId: 1,
        name: 'product2',
        catName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      const productsList = [productModel1, productModel2];
      mockRepo.all = jest
        .fn()
        .mockResolvedValue({ total: productsList.length, data: productsList });

      // when
      const products = await service.findAll();

      // then
      expect(products).toEqual({
        data: productsList,
        total: productsList.length,
      });
    });
  });

  describe('findOne', () => {
    it('해당 id의 상품이 없는 경우 undefined를 반환한다.', async () => {
      // given
      mockRepo.getByProductId = jest.fn().mockResolvedValue(undefined);

      // when
      const product = await service.findOne(1);

      // then
      expect(product).toBeUndefined();
    });

    it('해당 id의 상품이 있는 경우 상품을 반환한다.', async () => {
      // given
      const productModel = {
        id: 1,
        sellerId: 1,
        name: 'product1',
        catName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      mockRepo.getByProductId = jest.fn().mockResolvedValue(productModel);

      // when
      const foundProduct = await service.findOne(1);

      // then
      expect(foundProduct).toEqual(productModel);
    });
  });

  describe('update', () => {
    it('해당 id의 상품이 없는 경우 에러를 발생시킨다.', async () => {
      // given
      const updateProductDto = new CreateProductDto();
      updateProductDto.name = 'product1-update';

      mockRepo.update = jest.fn().mockImplementation(() => {
        throw new ProductNotFoundException();
      });

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
        catName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      mockRepo.getByProductId = jest.fn().mockResolvedValue(product);
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
      mockRepo.remove = jest.fn().mockImplementation(() => {
        throw new ProductNotFoundException();
      });

      // when
      const removeProduct = service.remove(1);

      // then
      await expect(removeProduct).rejects.toThrowError(
        ProductNotFoundException,
      );
    });

    it('해당 id의 상품이 있는 경우 상품을 삭제하고 삭제된 상품을 반환한다.', async () => {
      // given
      const productModel = {
        id: 1,
        sellerId: 1,
        name: 'product1',
        catName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      mockRepo.getByProductId = jest.fn().mockResolvedValue(productModel);
      mockRepo.remove = jest.fn().mockResolvedValue(productModel);

      // when
      const removedProduct = await service.remove(1);

      // then
      expect(removedProduct).toEqual(productModel);
    });
  });

  describe('subStock', () => {
    it('해당 id의 상품이 없는 경우 에러를 발생시킨다.', async () => {
      // given
      mockRepo.getByProductId = jest.fn().mockResolvedValue(undefined);

      // when
      const subStock = service.subStock(1, 10);

      // then
      await expect(subStock).rejects.toThrowError(ProductNotFoundException);
    });

    it('해당 id의 상품이 있고, 재고가 충분한 경우 상품의 재고를 감소시키고 감소된 상품을 반환한다.', async () => {
      // given
      const productModel = {
        id: 1,
        sellerId: 1,
        name: 'product1',
        catName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      mockRepo.getByProductId = jest.fn().mockResolvedValue(productModel);
      mockRepo.update = jest.fn().mockResolvedValue({
        ...productModel,
        stock: productModel.stock - 10,
      });

      // when
      const subStock = await service.subStock(1, 10);

      // then
      expect(subStock).toEqual({
        ...productModel,
        stock: productModel.stock - 10,
      });
    });

    it('해당 id의 상품이 있고, 재고가 충분하지 않은 경우 에러를 발생시킨다.', async () => {
      // given
      const productModel = {
        id: 1,
        sellerId: 1,
        name: 'product1',
        catName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      mockRepo.getByProductId = jest.fn().mockResolvedValue(productModel);

      // when
      const subStock = service.subStock(1, 1000);

      // then
      await expect(subStock).rejects.toThrowError('재고가 부족합니다.');
    });
  });

  describe('addStock', () => {
    it('해당 id의 상품이 없는 경우 에러를 발생시킨다.', async () => {
      // given
      mockRepo.getByProductId = jest.fn().mockResolvedValue(undefined);

      // when
      const addStock = service.addStock(1, 10);

      // then
      await expect(addStock).rejects.toThrowError(ProductNotFoundException);
    });

    it('해당 id의 상품이 있고, 재고를 증가시킨다.', async () => {
      // given
      const productModel = {
        id: 1,
        sellerId: 1,
        name: 'product1',
        catName: 'category',
        description: 'description',
        price: 10000,
        stock: 100,
      };
      mockRepo.getByProductId = jest.fn().mockResolvedValue(productModel);
      mockRepo.update = jest.fn().mockResolvedValue({
        ...productModel,
        stock: productModel.stock + 10,
      });

      // when
      const addStock = await service.addStock(1, 10);

      // then
      expect(addStock).toEqual({
        ...productModel,
        stock: productModel.stock + 10,
      });
    });
  });
});
