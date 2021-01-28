import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { QUEUE_NAME } from './config/config-server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@localhost:5672'],
      queue: QUEUE_NAME,
      queueOptions: {
        durable: false
      },
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3100);
}
bootstrap();