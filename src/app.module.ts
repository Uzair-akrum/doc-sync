import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
 import { ScheduleModule } from '@nestjs/schedule';
import { DocumentModule } from './document/document.module';
@Module({
  imports: [
    DocumentModule,
    UserModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
