import { Module, OnModuleInit } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocmentGateway } from './document.gateway';
import { DocumentController } from './document.controller';
import { Redis } from '@upstash/redis';

@Module({
  providers: [DocmentGateway, DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
