import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { QUEUE_NAME } from './config/config-server';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@localhost:5672'],
      queue: QUEUE_NAME,
      queueOptions: {
        durable: false
      },
    },
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();

