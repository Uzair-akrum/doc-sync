import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [PrismaModule, KafkaModule],
  providers: [PostResolver, PostService],
})
export class PostModule {}
