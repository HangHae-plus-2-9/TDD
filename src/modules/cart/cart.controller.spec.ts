import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('CartController', () => {
  let controller: CartController;
  let mockService: Partial<CartService>;

  beforeEach(async () => {
    mockService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: CartService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
