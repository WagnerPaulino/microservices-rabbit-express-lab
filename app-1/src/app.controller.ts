import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { EXCHANGE_NAME } from './config/config-server';

@Controller()
export class AppController {
  constructor(private appService: AppService, @Inject('POST_MESSAGES') private clientProxy: ClientProxy) { }

  @Get()
  async getHello(): Promise<string> {
    await this.clientProxy.emit(EXCHANGE_NAME, 'hello').toPromise();
    return this.appService.getHello();
  }
}
