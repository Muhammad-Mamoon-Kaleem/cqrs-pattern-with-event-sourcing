import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { CreateAccountCommand } from '../commands/create-account.command';
import { EventStoreRepository } from 'src/event-store/event-store.repository';
import { AccountCreatedEvent } from '../events/account-created.event';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler implements ICommandHandler<CreateAccountCommand> {
  constructor(
    private readonly eventStore: EventStoreRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAccountCommand): Promise<void> {
    const event = new AccountCreatedEvent(command.accountId, command.name);

    await this.eventStore.append({
      aggregateId: command.accountId,
      aggregateType: 'Account',
      eventType: 'AccountCreated',
      eventData: {
        name: command.name,
      },
      version: 1,
    });

    this.eventBus.publish(event);
  }
}
