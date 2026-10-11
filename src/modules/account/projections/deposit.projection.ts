import { EventsHandler } from '@nestjs/cqrs';
import { MoneyDepositedEvent } from '../events/money-deposited.event';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from '../schemas/account.schema';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

@EventsHandler(MoneyDepositedEvent)
export class DepositProjection {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
  ) {}
  async handle(event: MoneyDepositedEvent): Promise<void> {
    try {
      const account = await this.accountModel.findOne({
        accountId: event.accountId,
      });
      if (!account) {
        throw new Error(`Account with ID ${event.accountId} not found`);
      }
      account.balance += event.amount;
      await account.save();
    } catch (error) {
      Logger.error('Error handling MoneyDepositedEvent:', error);
      throw error;
    }
  }
}
