import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Kafka, Message, Consumer } from 'kafkajs';
import { sleep } from '../utils/sleep';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkajsConsumer implements OnApplicationBootstrap {
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(private readonly kafkaService: KafkaService) {
    this.consumer = this.kafkaService.getConsumer('test_id');
    this.logger = new Logger(KafkajsConsumer.name);
  }

  async onApplicationBootstrap() {
    await this.connect();
  }
  async consume(topic, message: Message) {
    await this.consumer.subscribe({ topic, fromBeginning: true });

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
