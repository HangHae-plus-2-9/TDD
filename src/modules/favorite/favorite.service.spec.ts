import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from './favorite.service';
import { Logger } from '@nestjs/common';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { AsyncLocalStorage } from 'async_hooks';
import { FavoriteRepositoryInterface } from './interface/favorite-repository.interface';

describe('FavoriteService', () => {
  let favoriteService: FavoriteService;
  let mockRepo: FavoriteRepositoryInterface;

  beforeEach(async () => {
    mockRepo = {} as any;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        WinstonContextLogger,
        AsyncLocalStorage,
        FavoriteService,
        {
          provide: 'FavoriteRepositoryInterface',
          useValue: mockRepo,
        },
      ],
    }).compile();

    favoriteService = module.get<FavoriteService>(FavoriteService);
  });

  it('should be defined', () => {
    expect(favoriteService).toBeDefined();
  });

  describe('findFavorite function', () => {
    it('should be defined', () => {
      expect(favoriteService.getAllfavoriteList).toBeDefined();
    });

    // it('id로 DB에 있는 즐겨찾기 목록을 찾는다.', async () => {
    //   await expect(
    //     favoriteService.getAllfavoriteList(mockUserId),
    //   ).resolves.toEqual(mockFavorite);
    // });
  });
});
