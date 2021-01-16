import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { EXCHANGE_NAME } from './config/config-server';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(EXCHANGE_NAME)
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getPattern()}`);
  }
  
}
