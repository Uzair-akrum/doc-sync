import { Injectable } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService {
  private readonly kafka: Kafka;

  constructor(private readonly configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: '1',
      brokers: [this.configService.get('KAFKA_EXTERNAL_HOST')],
    });
  }

  getProducer(): Producer {
    return this.kafka.producer();
  }

  getConsumer(groupId: string): Consumer {
    return this.kafka.consumer({ groupId });
  }
  getAdmin() {
    return this.kafka.admin();
  }
}
