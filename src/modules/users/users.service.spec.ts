import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { Logger } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let mockAuthService: Partial<AuthService>;
  let mockRepo: Partial<UsersRepository>;

  beforeEach(async () => {
    mockAuthService = {};
    mockRepo = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        WinstonContextLogger,
        AsyncLocalStorage,
        UsersService,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersRepository,
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should be defined', () => {
      expect(service.register).toBeDefined();
    });
  });
});
