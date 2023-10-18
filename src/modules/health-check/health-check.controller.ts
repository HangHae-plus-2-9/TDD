import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SampleHealthIndicator } from './indicators/sample.indicator';

@ApiTags('health-check')
@Controller({ version: '1', path: 'health-check' })
export class HealthCheckController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly sampleHealthIndicator: SampleHealthIndicator,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check 🫀' })
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('google', 'https://google.com'),
      () => this.db.pingCheck('database', { timeout: 300 }),
      () => this.sampleHealthIndicator.isHealthy('sample'),
    ]);
  }
}
