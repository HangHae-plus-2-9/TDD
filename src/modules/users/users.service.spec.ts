import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepositoryInterface } from './interfaces/user-repository.interface';
import { AuthService } from '../auth/auth.service';
import { WinstonContextLogger } from '@/winston-context/winston-context.logger';
import { Logger } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

describe('UsersService', () => {
  let service: UsersService;
  let mockAuthService: Partial<AuthService>;
  let mockRepo: UsersRepositoryInterface;

  beforeEach(async () => {
    mockAuthService = {};
    mockRepo = {
      create: jest.fn(),
      createMany: jest.fn(),
      all: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      paginate: jest.fn(),
      findByEmail: jest.fn(),
    };
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
          provide: 'UsersRepositoryInterface',
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
