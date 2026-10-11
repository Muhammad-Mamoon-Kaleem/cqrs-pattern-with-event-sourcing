import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateAccountHandler } from './handlers/create-account.handler';
import { AccountController } from './controllers/account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './schemas/account.schema';
import { AccountProjection } from './projections/account.projection';
import { GetAccountHandler } from './handlers/get-account.handler';
import { DepositProjection } from './projections/deposit.projection';
import { DepositMoneyHandler } from './handlers/deposit-money.handler';

const CommandHandlers = [CreateAccountHandler, DepositMoneyHandler];
const EventHandlers = [AccountProjection, DepositProjection];
const QueryHandlers = [GetAccountHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [...CommandHandlers, ...EventHandlers, ...QueryHandlers],
})
export class AccountModule {}
