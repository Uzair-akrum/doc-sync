import * as amqp from 'amqplib';
import { Message } from 'amqplib';
import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMqService implements OnApplicationBootstrap {
  private queueName;
  async onApplicationBootstrap() {
    this.consumeQueue();
  }

  constructor(
    @Inject(ConfigService)
    public config: ConfigService,
  ) {
    this.queueName = 'postk';
  }
  private connection: amqp.Connection;
  channel: amqp.Channel;
  private readonly maxRetryAttempts = 24;
  private readonly retryInterval = 5000;

  async connect() {
    try {
      this.connection = await this.retryConnection();
      this.channel = await this.connection.createChannel();

      this.channel.prefetch(10);
    } catch (error) {
      console.error(error);
    }
  }

  private async retryConnection(): Promise<amqp.Connection> {
    for (let attempt = 1; attempt <= this.maxRetryAttempts; attempt++) {
      try {
        console.log(this.config.get('RABBIT_MQ_URI'));
        const connection = await amqp.connect(this.config.get('RABBIT_MQ_URI'));

        return connection;
      } catch (error) {
        await this.delay(this.retryInterval);
      }
    }
    throw new Error(
      'RabbitMQ connection could not be established after maximum retries.',
    );
  }

  // Helper function to simulate a delay
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async sendEventToQueue(data: any) {
    try {
      const message = JSON.stringify(data);

      const event = await this.channel.sendToQueue(
        this.queueName,
        Buffer.from(message),
        {
          persistent: true, // Make the message persistent
        },
      );
      console.log(`Event sent to ${this.queueName}:`, event);
    } catch (error) {
      console.error('Error sending event:', error);
    }	
  }

  async consumeQueue() {
    try {
      const con = await this.connect();

      await this.channel.assertQueue(this.queueName, { durable: true });

      await this.channel.consume(this.queueName, async (message: Message) => {
        let msg = message.content.toString();

        msg = JSON.parse(msg);
        this.channel.ack(message);
      });
      console.log('Consumer started');
    } catch (err) {
      console.log(
        '🚀 ~ file: rabbitmq.service.ts:101 ~ consumeQueue ~ err:',
        err,
      );
      console.error(err);
    }
  }
}
