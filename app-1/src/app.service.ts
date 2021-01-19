import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postagem } from './domain/postagem';

@Injectable()
export class AppService {

  constructor(@InjectRepository(Postagem) private repoPost: Repository<Postagem>) { }

  getHello(): string {
    return 'Hello World!';
  }

  async findPost() {
    return await this.repoPost.find()
  }

  async savePost(post: Postagem): Promise<Postagem> {
    const postSaved = await this.repoPost.save(post);
    return postSaved;
  }

}
