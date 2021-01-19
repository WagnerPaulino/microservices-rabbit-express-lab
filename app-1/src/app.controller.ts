import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { EXCHANGE_NAME } from './config/config-server';
import { Postagem } from './domain/postagem';
import document from './main';

@Controller()
export class AppController {
  constructor(private appService: AppService,
    @Inject('POST_MESSAGES') private clientProxy: ClientProxy) { }

  @Post()
  @ApiResponse({ status: 200, description: 'Save a post.' })
  async savePost(@Body() post: Postagem): Promise<Postagem> {
    const postSaved = await this.appService.savePost(post);
    await this.clientProxy.emit(EXCHANGE_NAME, 'hello').toPromise();
    return postSaved;
  }

  @Get('posts')
  @ApiResponse({ status: 200, description: 'List posts.' })
  async findPost() {
    return await this.appService.findPost()
  }

  @Get('openapi')
  @ApiResponse({ status: 200, description: 'Return a openapi as json.' })
  async getOpenApiJson() {
    return (await document)
  }

}
