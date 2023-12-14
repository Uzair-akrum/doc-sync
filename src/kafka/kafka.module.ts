import { Module } from '@nestjs/common';
import { KafkajsAdmin } from './kafka.admin';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [KafkajsAdmin],
})
export class KafkaModule {}
