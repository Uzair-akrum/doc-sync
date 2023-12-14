import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';
import { sleep } from '../utils/sleep';
import { KafkaService } from './kafka.service';
@Injectable()
export class KafkajsProducer implements OnApplicationBootstrap {
   private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(  private readonly kafkaService: KafkaService	) {
    this.producer = this.kafkaService.getProducer();
    this.logger = new Logger(KafkajsProducer.name);
  }

  async onApplicationBootstrap() {
    await this.connect();
  }
  async produce(topic, message: Message) {
    await this.producer.send({ topic, messages: [message] });
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      await sleep(5000);
      await this.connect();
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
