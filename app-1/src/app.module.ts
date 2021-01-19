import { PostModule } from './post/post.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_NAME } from './config/config-server';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './domain/postagem';
import { typeORMConfig } from './config/typeorm-config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
