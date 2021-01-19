import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import document from './main';

@Controller()
export class AppController {
  constructor() {}

  @Get('openapi')
  @ApiResponse({ status: 200, description: 'Return a openapi as json.' })
  async getOpenApiJson() {
    return await document;
  }
}
