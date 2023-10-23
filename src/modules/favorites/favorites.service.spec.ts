import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';
import { Logger } from '@nestjs/common';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { AsyncLocalStorage } from 'async_hooks';
import { FavoritesRepository } from './favorites.repository';

describe('FavoritesService', () => {
  let favoriteService: FavoritesService;
  let mockRepo: Partial<FavoritesRepository>;

  beforeEach(async () => {
    mockRepo = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        WinstonContextLogger,
        AsyncLocalStorage,
        FavoritesService,
        {
          provide: FavoritesRepository,
          useValue: mockRepo,
        },
      ],
    }).compile();

    favoriteService = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(favoriteService).toBeDefined();
  });

  describe('findFavorite function', () => {
    it('should be defined', () => {
      expect(favoriteService.getAllFavoriteList).toBeDefined();
    });

    // it('id로 DB에 있는 즐겨찾기 목록을 찾는다.', async () => {
    //   await expect(
    //     favoriteService.getAllFavoriteList(mockUserId),
    //   ).resolves.toEqual(mockFavorite);
    // });
  });
});
