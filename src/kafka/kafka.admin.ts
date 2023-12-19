import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { Admin } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { sleep } from 'src/utils/sleep';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkajsAdmin implements OnApplicationBootstrap {
  private readonly logger: Logger;
  private readonly admin: Admin;

  constructor(
    private readonly configService: ConfigService,
    private readonly kafkaService: KafkaService,
  ) {
    this.logger = new Logger(KafkajsAdmin.name);
    this.logger.log('Constructor Called');

    this.admin = this.kafkaService.getAdmin();
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
  async createTopic(topic) {
    await this.admin.createTopics({
      topics: [{ topic }],
      waitForLeaders: true,
      validateOnly: false,
      timeout: 10000,
    });

    this.logger.log('Topic Created', topic);
  }
  async onApplicationBootstrap() {
    await this.connect();
  }
}
