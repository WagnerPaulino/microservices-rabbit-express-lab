import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Postagem } from 'src/domain/postagem';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Postagem) private repoPost: Repository<Postagem>,
  ) {}

  async findPost() {
    return await this.repoPost.find();
  }

  async savePost(post: Postagem): Promise<Postagem> {
    const postSaved = await this.repoPost.save(post);
    return postSaved;
  }
}
