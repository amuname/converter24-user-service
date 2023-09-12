import { ConflictException, Injectable } from '@nestjs/common';
import { prisma } from '../prisma_orm';
import { User, UsersOnAccounts } from '@prisma/client';
// import { v4 as uuidv4 } from 'uuid';
import { HashService } from '../hash/hash.service';
import { AccountService } from '../account/account.service';
import { UserCredentials } from '../user-credentials/user-credentials.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private readonly hashService: HashService,
    private readonly accountService: AccountService,
  ) {}

  async createUser(user_credentials: UserCredentials) /*: Promise<User>*/ {
    console.log('user_credentials :', user_credentials);
    const { email, password } = user_credentials;
    const isAlreadyExist = await this.getUserByEmail(email);
    console.log('isAlreadyExist :', isAlreadyExist);
    if (isAlreadyExist?.id) return true;

    const hash = await firstValueFrom(this.hashService.getHash(password));

    const newUser: User = await prisma.user.create({
      data: {
        email,
        hash,
      },
    });

    await this.accountService.createAccountAndUsersOnAccounts(
      newUser,
      'user.create',
      true,
    );

    return false;
    // return { statusCode: 201, message: 'User created' };
  }

  async loginUser(user_credentials: UserCredentials) {
    const user = await this.getUserByCredentials(user_credentials);
    const isValidPassword = this.hashService.compareHash({
      string: user_credentials.password,
      hash: user.hash,
    });
    return isValidPassword;
  }

  async getUserByCredentials(user_credentials: UserCredentials): Promise<User> {
    return await prisma.user.findFirst({
      where: {
        email: user_credentials.email,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async allAccounts(email: string): Promise<UsersOnAccounts[]> {
    const result = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        accounts: true,
      },
    });
    console.log('ACCOUNTS', result);
    return result.accounts.filter((user_on_acc) => user_on_acc.active);
  }
}
