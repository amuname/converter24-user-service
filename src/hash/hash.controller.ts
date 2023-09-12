import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller('hash')
export class HashController {
  @EventPattern({ evt: 'user.create' })
  async createUser(@Payload() data) {
    console.log('@Payload: ', data);
    // TO DO
  }
}
