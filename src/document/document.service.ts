import { Injectable } from '@nestjs/common';
import { Redis } from '@upstash/redis';

@Injectable()
export class DocumentService {
  private redis: Redis;
  constructor() {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL || '',
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    });
  }
  getRedisClient() {
    return this.redis;
  }
  async getDocumentbyId() {
    return await this.redis.get('content');
  }
}
