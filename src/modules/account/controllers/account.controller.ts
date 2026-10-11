import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateAccountDto } from '../dto/create-account.dto';
import { CreateAccountCommand } from '../commands/create-account.command';
import { getAccountQuery } from '../queries/get-account.query';
import { DepositMoneyCommand } from '../commands/deposit-money.command';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateAccountDto) {
    console.log('Received CreateAccountDto:', dto);
    await this.commandBus.execute(
      new CreateAccountCommand(dto.accountId, dto.name),
    );

    return {
      message: 'Account created successfully',
    };
  }

  @Get(':accountId')
  async getAccount(@Param('accountId') accountId: string): Promise<any> {
    return this.queryBus.execute(new getAccountQuery(accountId));
  }

  @Post(':accountId/deposit')
  async depositMoney(
    @Param('accountId') accountId: string,
    @Body('amount') amount: number,
  ) {
    await this.commandBus.execute(new DepositMoneyCommand(accountId, amount));
    return { message: 'Money deposited successfully' };
  }
}
