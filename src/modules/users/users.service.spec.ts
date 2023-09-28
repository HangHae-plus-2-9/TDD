import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Logger } from '@nestjs/common';
import { UsersRepositoryInterface } from './interfaces/user-repository.interface';
import { AuthService } from '../auth/auth.service';

describe('UsersService', () => {
  let service: UsersService;
  let logger: Logger;
  let authService: Partial<AuthService>;
  let repo: UsersRepositoryInterface;

  beforeEach(async () => {
    authService = {};
    repo = {
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
        UsersService,
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: 'UsersRepositoryInterface',
          useValue: repo,
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
