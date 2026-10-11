import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { EventStoreRepository } from 'src/event-store/event-store.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { MoneyDepositedEvent } from '../events/money-deposited.event';
import { DepositMoneyCommand } from '../commands/deposit-money.command';

@CommandHandler(DepositMoneyCommand)
export class DepositMoneyHandler {
  constructor(
    private readonly eventStore: EventStoreRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DepositMoneyCommand): Promise<void> {
    try {
      const event = new MoneyDepositedEvent(command.accountId, command.amount);
      const currentVersion = await this.eventStore.getCurrentVersion(
        command.accountId,
      );
      if (currentVersion === null || currentVersion === 0) {
        Logger.error(`Account with ID ${command.accountId} does not exist`);
        throw new NotFoundException(
          `Account with ID ${command.accountId} does not exist`,
        );
      }
      Logger.log('currentVersion: ' + currentVersion);

      await this.eventStore.append({
        aggregateId: command.accountId,
        aggregateType: 'Account',
        eventType: 'MoneyDeposited',
        eventData: {
          amount: command.amount,
        },
        version: 1,
      });
      this.eventBus.publish(event);
      Logger.log(
        `Money deposited: ${command.amount} to account ${command.accountId}`,
      );
    } catch (error) {
      Logger.error('Error handling DepositMoneyCommand:', error);
      throw error;
    }
  }
}
