import { Inject, Injectable } from '@nestjs/common';
import { Account, User, UsersOnAccounts } from '@prisma/client';
import { prisma } from '../prisma_orm';
import { ClientProxy } from '@nestjs/microservices';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccountService {
  constructor(@Inject('TRANSPORT') private transport: ClientProxy) {}

  async createAccount(user: User): Promise<Account> {
    return await prisma.account.create({
      data: {
        account_name: `account_${user.email}`,
        creator: {
          connect: {
            id: user.id,
          },
        },
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async createUsersOnAccounts(
    user: User,
    account: Account,
    assignee: string,
    active: boolean,
  ): Promise<UsersOnAccounts> {
    return await prisma.usersOnAccounts.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        assignedBy: {
          connect: {
            id: user.id,
          },
        },
        active: active,
        account: {
          connect: {
            id: account.id,
          },
        },
      },
    });
  }

  async createSciptStorageAccountByIds(arg: {
    account_id: string;
    user_id: string;
  }) {
    this.transport.emit({ evt: 'account_service.account_created' }, arg);
  }

  async createAccountAndUsersOnAccounts(
    user: User,
    assignee: string,
    active: boolean,
  ): Promise<UsersOnAccounts> {
    const account = await this.createAccount(user);
    await this.createSciptStorageAccountByIds({
      account_id: account.id,
      user_id: user.id,
    });
    return await this.createUsersOnAccounts(user, account, assignee, active);
  }
}
