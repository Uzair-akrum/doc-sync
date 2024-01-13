import { Module, OnModuleInit } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocmentGateway } from './document.gateway';
import { DocumentController } from './document.controller';
import { Redis } from '@upstash/redis';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DocumentDailySync } from 'src/jobs/documentSyncDaily';

@Module({
  imports: [PrismaModule],
  providers: [DocmentGateway, DocumentDailySync, DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
