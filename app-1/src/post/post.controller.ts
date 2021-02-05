import { ApiResponse } from '@nestjs/swagger';
import { PostService } from './post.service';
import { ClientProxy } from '@nestjs/microservices';
import { Body, Controller, Get, Inject, Post, Param } from '@nestjs/common';
import { Postagem } from 'src/domain/postagem';
import { EXCHANGE_NAME } from 'src/config/config-server';

@Controller({ path: 'posts' })
export class PostController {
  constructor(
    @Inject('POST_MESSAGES') private clientProxy: ClientProxy,
    private postService: PostService,
  ) { }

  @Post()
  @ApiResponse({ status: 200, description: 'Save a post.' })
  async savePost(@Body() post: Postagem): Promise<Postagem> {
    const postSaved = await this.postService.savePost(post);
    await this.clientProxy.emit(EXCHANGE_NAME, 'hello').toPromise();
    return postSaved;
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List posts.' })
  async findPost() {
    return await this.postService.findPost();
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'One posts.' })
  async findPostById(@Param('id') id: number) {
    return await this.postService.findPostById(id);
  }

}
