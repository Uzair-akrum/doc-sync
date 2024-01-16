import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { Consumer } from 'kafkajs';
import { sleep } from '../utils/sleep';
import { KafkaService } from './kafka.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class KafkajsConsumer implements OnApplicationBootstrap {
  private readonly consumer: Consumer;
  private readonly logger: Logger;
  private static isSubscribed: boolean = false;

  constructor(
    private readonly kafkaService: KafkaService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.consumer = this.kafkaService.getConsumer('test_id');
    this.logger = new Logger(KafkajsConsumer.name);
    this.logger.log('constructor-------');
  }

  async onApplicationBootstrap() {
    await this.connect();
  }
  async onModuleDestroy() {
    console.log('destroy=====');
    await this.disconnect();
  }
  async subscribe(topic) {
    KafkajsConsumer.isSubscribed = true;

    await this.consumer.subscribe({
      topic,
    });
  }
  @OnEvent('consume')
  async consume() {
    console.log(KafkajsConsumer.isSubscribed);
    if (KafkajsConsumer.isSubscribed) {
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
          this.logger.log(`- ${prefix} ${message.key}#${message.value}`);
        },
      });
    }
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
