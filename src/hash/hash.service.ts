import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class HashService {
  constructor(@Inject('TRANSPORT') private transport: ClientProxy) {}
  getHash(arg: string) {
    return this.transport.send({ cmd: 'hash.generate' }, arg);
  }

  compareHash(data) {
    return this.transport.send({ cmd: 'hash.compare' }, data);
  }
}
