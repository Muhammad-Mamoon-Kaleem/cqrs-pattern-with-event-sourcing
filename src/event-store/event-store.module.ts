import { Global, Module } from '@nestjs/common';
import { EventStoreRepository } from './event-store.repository';

@Global()
@Module({
  providers: [EventStoreRepository],
  exports: [EventStoreRepository],
})
export class EventStoreModule {}
