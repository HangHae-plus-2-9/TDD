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
  let health: Partial<HealthCheckService>;
  let http: Partial<HttpHealthIndicator>;
  let typeOrm: Partial<TypeOrmHealthIndicator>;
  let sample: Partial<SampleHealthIndicator>;

  beforeEach(async () => {
    health = {
      check: jest.fn(),
    };
    http = {
      pingCheck: jest.fn(),
    };
    typeOrm = {
      pingCheck: jest.fn(),
    };
    sample = {
      isHealthy: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: health,
        },
        {
          provide: HttpHealthIndicator,
          useValue: http,
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: typeOrm,
        },
        {
          provide: SampleHealthIndicator,
          useValue: sample,
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
    health.check = check;
    controller.check();
    expect(check).toBeCalled();
  });

  it('should run general health checks', async () => {
    // Arrange
    const httpResult = { status: 'up' };
    const dbResult = { status: 'up' };
    const sampleResult = { status: 'up' };

    const httpSpy = jest
      .spyOn(http, 'pingCheck')
      .mockResolvedValue(httpResult as unknown as HealthIndicatorResult);
    const dbSpy = jest
      .spyOn(typeOrm, 'pingCheck')
      .mockResolvedValue(dbResult as unknown as HealthIndicatorResult);
    const sampleSpy = jest
      .spyOn(sample, 'isHealthy')
      .mockResolvedValue(sampleResult as any);

    const healthSpy = jest
      .spyOn(health, 'check')
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
    expect(httpSpy).toHaveBeenCalledWith('google', 'https://google.com');
    expect(dbSpy).toHaveBeenCalledWith('database', { timeout: 300 });
    expect(sampleSpy).toHaveBeenCalledWith('sample');
    expect(result).toEqual({
      status: 'up',
      info: [httpResult, dbResult, sampleResult],
    });
  });
});
