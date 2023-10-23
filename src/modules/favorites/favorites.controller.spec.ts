import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('FavoritesController', () => {
  let controller: FavoritesController;
  let mockService: Partial<FavoritesService>;

  beforeEach(async () => {
    mockService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: FavoritesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
