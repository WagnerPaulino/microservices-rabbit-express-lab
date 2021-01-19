import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postagem } from './domain/postagem';

@Injectable()
export class AppService {

  constructor() { }

  getHello(): string {
    return 'Hello World!';
  }
}
