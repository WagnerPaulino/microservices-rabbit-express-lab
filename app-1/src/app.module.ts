import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_NAME } from './config/config-server';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_MESSAGES', transport: Transport.RMQ, options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: QUEUE_NAME,
          queueOptions: {
            durable: false
          }
        },
      }]),
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
