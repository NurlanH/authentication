import { Body, Controller  } from '@nestjs/common';
import {  MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { SignInDTO, SignUpDTO } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @MessagePattern({ cmd: 'get_users' })
  async getAllUsers(@Payload() data: any): Promise<any> {
    const { limit, page, search } = data;
    return await this.appService.getAllUsers(limit, page, search);
  }
 

  @MessagePattern({ cmd: 'signup_user' })
  async createUser(@Payload() data: SignUpDTO):Promise<any> {
    return await this.appService.signUp(data);
  }

  @MessagePattern({ cmd: 'signin_user' })
  async getNotifications(@Payload() data: SignInDTO):Promise<any> {
    return await this.appService.signIn(data);
  }

  @MessagePattern({ cmd: 'validate_user' })
  async validateUser(@Payload() data: any):Promise<any> {
    return await this.appService.validateUser(data);``
  }

  @MessagePattern({ cmd: 'pay_order' })
  async payOrder(@Payload() data: any):Promise<any> {
    return await this.appService.payOrder(data);
  }
  
}
