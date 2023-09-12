import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  // Ctx,
  // NatsContext,
} from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserCredentials } from '../user-credentials/user-credentials.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'user.find' })
  async getUserByCredentials(@Payload() email: string) {
    console.log(email);
    return await this.userService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: 'user.create' })
  async createUser(@Payload() data: UserCredentials) {
    return await this.userService.createUser(data);
  }

  @MessagePattern({ cmd: 'user.login' })
  async loginUser(@Payload() data: UserCredentials) {
    return await this.userService.loginUser(data);
  }

  @MessagePattern({ cmd: 'user.allAccounts' })
  async allAccounts(@Payload() email: string) {
    return await this.userService.allAccounts(email);
  }
}
