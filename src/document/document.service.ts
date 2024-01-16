import { Injectable } from '@nestjs/common';
import { Redis } from '@upstash/redis';
import { PrismaService } from 'src/prisma/prisma.service';

type createDocumentDto = {
  name: string;
};

@Injectable()
export class DocumentService {
  private redis: Redis;
  constructor(private readonly prismaService: PrismaService) {
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
  async createDocument(name: any) {
    console.log('🚀 ~ DocumentService ~ createDocument ~ name:', name);
    return await this.prismaService.document.create({ data: { author: name } });
  }
  async getDocumentByAuthor(name: string) {
    return await this.prismaService.document.findMany({
      where: { author: name },
    });
  }
}
