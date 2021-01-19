import { ClientsModule, Transport } from '@nestjs/microservices';
import { Postagem } from './../domain/postagem';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Module } from '@nestjs/common';
import { QUEUE_NAME } from 'src/config/config-server';

@Module({
  imports: [
    TypeOrmModule.forFeature([Postagem]),
    ClientsModule.register([
      {
        name: 'POST_MESSAGES',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: QUEUE_NAME,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
  // exports: [PostController, PostService],
})
export class PostModule {}
