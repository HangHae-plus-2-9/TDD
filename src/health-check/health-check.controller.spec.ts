import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { SampleHealthIndicator } from './indicators/sample.indicator';
import {
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;
  let healthCheckService: Partial<HealthCheckService>;
  let httpHealthIndicator: Partial<HttpHealthIndicator>;
  let typeOrmHealthIndicator: Partial<TypeOrmHealthIndicator>;
  let sampleHealthIndicator: Partial<SampleHealthIndicator>;

  beforeEach(async () => {
    healthCheckService = {
      check: jest.fn(),
    };
    httpHealthIndicator = {
      pingCheck: jest.fn(),
    };
    typeOrmHealthIndicator = {
      pingCheck: jest.fn(),
    };
    sampleHealthIndicator = {
      isHealthy: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: healthCheckService,
        },
        {
          provide: HttpHealthIndicator,
          useValue: httpHealthIndicator,
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: typeOrmHealthIndicator,
        },
        {
          provide: SampleHealthIndicator,
          useValue: sampleHealthIndicator,
        },
      ],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call health check service', () => {
    const check = jest.fn();
    healthCheckService.check = check;
    controller.check();
    expect(check).toBeCalled();
  });
});
