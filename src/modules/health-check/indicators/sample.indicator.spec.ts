import { Test, TestingModule } from '@nestjs/testing';
import { SampleHealthIndicator } from './sample.indicator';

describe('SampleHealthIndicator', () => {
  let sampleHealthIndicator: SampleHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleHealthIndicator],
    }).compile();

    sampleHealthIndicator = module.get<SampleHealthIndicator>(
      SampleHealthIndicator,
    );
  });

  it('should be defined', () => {
    expect(sampleHealthIndicator).toBeDefined();
  });

  it('should return status', async () => {
    const result = await sampleHealthIndicator.isHealthy('sample');
    expect(result).toEqual({
      sample: {
        status: 'up',
        badSamples: 0,
      },
    });
  });

  it('should throw error', async () => {
    sampleHealthIndicator['nodes'] = [
      { name: 'sample1', type: 'good' },
      { name: 'sample2', type: 'bad' },
      { name: 'sample3', type: 'good' },
    ];
    await expect(
      sampleHealthIndicator.isHealthy('sample'),
    ).rejects.toThrowError('Sample Check failed');
  });
});
