import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('FavoriteController', () => {
  let controller: FavoriteController;
  let mockService: Partial<FavoriteService>;

  beforeEach(async () => {
    mockService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: FavoriteService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<FavoriteController>(FavoriteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
