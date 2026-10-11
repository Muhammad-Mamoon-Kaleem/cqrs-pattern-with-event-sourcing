import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Account } from '../schemas/account.schema';
import { getAccountQuery } from '../queries/get-account.query';
import { Logger } from '@nestjs/common';

@QueryHandler(getAccountQuery)
export class GetAccountHandler implements IQueryHandler<getAccountQuery> {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
  ) {}

  async execute(query: getAccountQuery) {
    Logger.log(`Executing getAccountQuery for accountId: ${query.accountId}`);
    const account = await this.accountModel.findById(query.accountId);
    if (!account) {
      Logger.warn(`Account not found for accountId: ${query.accountId}`);
      return {
        message: `Account with ID ${query.accountId} not found`,
        success: false,
      };
    }
    Logger.log(`Found account: ${JSON.stringify(account)}`);
    return {
      message: `Account with ID ${query.accountId} found`,
      success: true,
      data: account,
    };
  }
}
