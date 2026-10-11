import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountCreatedEvent } from '../events/account-created.event';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from '../schemas/account.schema';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

@EventsHandler(AccountCreatedEvent)
export class AccountProjection implements IEventHandler<AccountCreatedEvent> {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}
  async handle(event: AccountCreatedEvent): Promise<void> {
    try {
      const account = await this.accountModel.create({
        accountId: event.accountId,
        name: event.name,
        balance: 0,
      });
      Logger.log(`Account created: ${account.accountId} - ${account.name}`);
    } catch (error) {
      Logger.error('Error handling AccountCreatedEvent:', error);
      throw error;
    }
  }
}
