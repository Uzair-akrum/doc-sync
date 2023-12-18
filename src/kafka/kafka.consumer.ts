import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Consumer } from 'kafkajs';
import { sleep } from '../utils/sleep';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkajsConsumer implements OnModuleInit {
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(private readonly kafkaService: KafkaService) {
    this.consumer = this.kafkaService.getConsumer('test_id');
    this.logger = new Logger(KafkajsConsumer.name);
  }

  async onModuleInit() {
    this.logger.log('Consumer Connecting==');

    await this.connect();
    this.logger.log('Consumer Connected==');

    await this.consume();
    this.logger.log('Consumed==');
  }
  async onModuleDestroy() {
    await this.disconnect();
  }
  async subscribe(topic) {
    await this.consumer.subscribe({
      topic: `notify_${topic}`,
      fromBeginning: true,
    });
  }
  async consume() {
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        this.logger.log(`- ${prefix} ${message.key}#${message.value}`);
      },
    });
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      await sleep(5000);
      await this.connect();
    }
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
