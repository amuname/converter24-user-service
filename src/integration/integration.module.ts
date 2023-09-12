// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// // import { IntegrationController } from './integration.controller';
// // import { IntegrationService } from './integration.service';

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'TRANSPORT',
//         transport: Transport.NATS,
//         options: {
//           servers: ['nats://localhost:4222'],
//         },
//       },
//     ]),
//   ],
//   controllers: [IntegrationController],
//   providers: [IntegrationService],
// })
// export class IntegrationModule {}
