import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { QueryDTO } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllUsers(@Query() query:QueryDTO): Promise<any> {
    const { limit, page, search } = query;
    return await this.appService.getAllUsers(limit, page, search);
  }


}
