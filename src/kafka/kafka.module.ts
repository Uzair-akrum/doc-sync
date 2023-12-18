import { Module } from '@nestjs/common';
import { KafkajsAdmin } from './kafka.admin';
import { KafkaService } from './kafka.service';
import { KafkajsConsumer } from './kafka.consumer';
import { KafkajsProducer } from './kafka.producer';

@Module({
  providers: [KafkajsAdmin, KafkaService, KafkajsConsumer, KafkajsProducer],
  exports: [KafkajsConsumer, KafkajsProducer],
})
export class KafkaModule {}
