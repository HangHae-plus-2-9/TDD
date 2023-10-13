import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from './favorite.service';

const mockUserId = 1;
const mockFavorite = [
  {
    userId: 1,
    itemId: 1,
  },
  {
    userId: 1,
    itemId: 2,
  },
  {
    userId: 1,
    itemId: 3,
  },
];

describe('FavoriteService', () => {
  let favoriteService: FavoriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteService],
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

    it('id로 DB에 있는 즐겨찾기 목록을 찾는다.', async () => {
      await expect(
        favoriteService.getAllfavoriteList(mockUserId),
      ).resolves.toEqual(mockFavorite);
    });
  });
});
