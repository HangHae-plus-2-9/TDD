import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { SampleHealthIndicator } from './indicators/sample.indicator';
import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorFunction,
  HealthIndicatorResult,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;
  let mockHealth: Partial<HealthCheckService>;
  let mockHttp: Partial<HttpHealthIndicator>;
  let mockTypeOrm: Partial<TypeOrmHealthIndicator>;
  let mockSample: Partial<SampleHealthIndicator>;

  beforeEach(async () => {
    mockHealth = {
      check: jest.fn(),
    };
    mockHttp = {
      pingCheck: jest.fn(),
    };
    mockTypeOrm = {
      pingCheck: jest.fn(),
    };
    mockSample = {
      isHealthy: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: mockHealth,
        },
        {
          provide: HttpHealthIndicator,
          useValue: mockHttp,
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: mockTypeOrm,
        },
        {
          provide: SampleHealthIndicator,
          useValue: mockSample,
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
    mockHealth.check = check;
    controller.check();
    expect(check).toBeCalled();
  });

  it('should run general health checks', async () => {
    // Arrange
    // const httpResult = { status: 'up' };
    const dbResult = { status: 'up' };
    const sampleResult = { status: 'up' };

    // const httpSpy = jest
    //   .spyOn(mockHttp, 'pingCheck')
    //   .mockResolvedValue(httpResult as unknown as HealthIndicatorResult);
    const dbSpy = jest
      .spyOn(mockTypeOrm, 'pingCheck')
      .mockResolvedValue(dbResult as unknown as HealthIndicatorResult);
    const sampleSpy = jest
      .spyOn(mockSample, 'isHealthy')
      .mockResolvedValue(sampleResult as any);

    const healthSpy = jest
      .spyOn(mockHealth, 'check')
      .mockImplementation(
        async (healthIndicators: HealthIndicatorFunction[]) => {
          const results = await Promise.all(healthIndicators.map((cb) => cb()));
          return {
            status: 'up',
            info: results,
          } as unknown as HealthCheckResult;
        },
      );

    // Act
    const result = await controller.check();

    // Assert
    expect(healthSpy).toHaveBeenCalled();
    // expect(httpSpy).toHaveBeenCalledWith('google', 'https://google.com');
    expect(dbSpy).toHaveBeenCalledWith('database', { timeout: 300 });
    expect(sampleSpy).toHaveBeenCalledWith('sample');
    expect(result).toEqual({
      status: 'up',
      info: [dbResult, sampleResult],
      // info: [httpResult, dbResult, sampleResult],
    });
  });
});
