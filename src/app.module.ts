import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { AppController } from './app.controller';
import { UserModule } from './users/user.module';
import { HashModule } from './hash/hash.module';
import { AccountModule } from './account/account.module';
// import { IntegrationModule } from './integration/integration.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSPORT',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
    // IntegrationModule,
    HashModule,
    UserModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
