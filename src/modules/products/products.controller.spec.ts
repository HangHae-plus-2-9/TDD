import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockService: Partial<ProductsService>;

  beforeEach(async () => {
    mockService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: ProductsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
