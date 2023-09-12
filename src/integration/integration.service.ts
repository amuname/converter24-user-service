// import { Injectable } from '@nestjs/common';
// // import { AccountService } from 'src/account/account.service';
// import { AccountIdAndUserIdAndName } from './interfaces/account-id-and-user-id-and-name.interface';
// import { AccountIdAndUserId } from './interfaces/account-id-and-user-id.interface';
// import { Integration } from '@prisma/client';
// import { prisma } from 'src/prisma_orm';

// @Injectable()
// export class IntegrationService {
//   async integrationCreate(
//     data: AccountIdAndUserIdAndName,
//   ): Promise<Integration> {
//     return await prisma.integration.create({
//       data,
//     });
//   }

//   async integrationsFindByAccountAndUser(
//     data: AccountIdAndUserId,
//   ): Promise<Integration[]> {
//     console.log('data', data);
//     return await prisma.integration.findMany({
//       where: data,
//     });
//   }
// }
