import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { EXCHANGE_NAME } from './config/config-server';
import { ApiResponse } from '@nestjs/swagger';
import document from './main'

@Controller()
export class AppController {
  constructor(private appService: AppService, @Inject('POST_MESSAGES') private clientProxy: ClientProxy) { }

  @Get()
  @ApiResponse({ status: 200, description: 'The Hello has been successfully created.' })
  async getHello(): Promise<string> {
    await this.clientProxy.emit(EXCHANGE_NAME, 'hello').toPromise();
    return this.appService.getHello();
  }

  @Get('openapi')
  @ApiResponse({ status: 200, description: 'Return a openapi as json.' })
  async getOpenApiJson() {
    return (await document)
  }

}
