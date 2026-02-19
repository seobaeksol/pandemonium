import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import Redis from 'ioredis';

@Controller('api/v1/health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async check() {
    const postgres = await this.checkPostgres();
    const redis = await this.checkRedis();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        postgres,
        redis,
      },
    };
  }

  private async checkPostgres() {
    const client = new Client({
      connectionString: this.configService.get<string>('DATABASE_URL'),
    });
    try {
      await client.connect();
      const res = await client.query('SELECT 1');
      await client.end();
      return { status: 'up', latency: 'ok' };
    } catch (e) {
      this.logger.error(`Postgres check failed: ${e.message}`);
      return { status: 'down', error: e.message };
    }
  }

  private async checkRedis() {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    if (!redisUrl) {
      return { status: 'down', error: 'REDIS_URL not configured' };
    }
    const redis = new Redis(redisUrl);
    try {
      await redis.ping();
      redis.disconnect();
      return { status: 'up' };
    } catch (e) {
      this.logger.error(`Redis check failed: ${e.message}`);
      return { status: 'down', error: e.message };
    }
  }
}
