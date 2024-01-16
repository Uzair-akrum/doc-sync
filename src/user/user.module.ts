import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule],
  providers: [],
  controllers: [UserController],
})
export class UserModule {}
