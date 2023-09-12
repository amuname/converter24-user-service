// import { Controller } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
// import { IntegrationService } from './integration.service';
// import { AccountIdAndUserIdAndName } from './interfaces/account-id-and-user-id-and-name.interface';

// @Controller()
// export class IntegrationController {
//   constructor(private readonly integrationService: IntegrationService) {}

//   @MessagePattern({ cmd: 'integration.create' })
//   async integrationCreate(@Payload() data: AccountIdAndUserIdAndName) {
//     return await this.integrationService.integrationCreate(data);
//   }

//   @MessagePattern({ cmd: 'integration.findMany.byAccountUser' })
//   async integrationsFindByAccountAndUser(
//     @Payload() data: AccountIdAndUserIdAndName,
//   ) {
//     return await this.integrationService.integrationsFindByAccountAndUser(data);
//   }
// }
