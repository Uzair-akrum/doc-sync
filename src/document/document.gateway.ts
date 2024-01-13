import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { DocumentService } from './document.service';
import { Redis } from '@upstash/redis';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class DocmentGateway {
  @WebSocketServer() server: Server;
  private redis: Redis;
  private counter: number;
  constructor(private readonly messageService: DocumentService) {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL || '',
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    });
    this.counter = 0;
  }

  @SubscribeMessage('create-message')
  async create(
    @MessageBody() createMessageDto: any,
    @ConnectedSocket() client: Socket,
  ) {
    this.counter = this.counter + 1;
    const { content, cordinates } = createMessageDto;
    console.log('🚀 ~ DocmentGateway ~ cordinates:', this.counter,content);

    await this.redis.set('content', content);
    const sockets = await this.server.fetchSockets();
    for (const socket of sockets) {
      if (socket.id !== client.id) {
        await socket.emit('document-change', createMessageDto);
      }
    }
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    //return this.messageService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    //return this.messageService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: any) {
    //return this.messageService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    //return this.messageService.remove(id);
  }
}
