import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Message, Producer, logLevel, Admin } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { sleep } from 'src/utils/sleep';

@Injectable()
export class KafkajsAdmin implements OnApplicationBootstrap {
  private readonly kafka: Kafka;
  private readonly logger: Logger;
  private readonly admin: Admin;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger();
    this.logger.log('Constructor Called');
    this.kafka = new Kafka({
      logLevel: logLevel.INFO,
      brokers: [`${this.configService.get('HOST')}:9092`],
      clientId: '1',
    });

    this.admin = this.kafka.admin();
  }

  async connect() {
    try {
      this.logger.log('Connecting Admin...');
      await this.admin.connect();
      this.logger.log('Connected to kafka Admin');
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      await sleep(5000);
      await this.connect();
    }
  }
  async onApplicationBootstrap() {
    await this.connect();
  }
}
