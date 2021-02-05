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

  async findPostById(id: number) {
    return await this.repoPost.findOne(id);
  }

  async savePost(post: Postagem): Promise<Postagem> {
    const postSaved = await this.repoPost.save(post);
    return postSaved;
  }
}
