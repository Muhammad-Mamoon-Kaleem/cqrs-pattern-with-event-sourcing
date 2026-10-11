import { Injectable } from '@nestjs/common';
import { KnexService } from '../database/knex/knex.service';
import { StoredEvent } from './interfaces/stored-event.interface';

@Injectable()
export class EventStoreRepository {
  constructor(private readonly knex: KnexService) {}
  async append(event: StoredEvent): Promise<void> {
    await this.knex.db('event_store').insert({
      aggregate_id: event.aggregateId,
      aggregate_type: event.aggregateType,
      event_type: event.eventType,
      event_data: JSON.stringify(event.eventData),
      version: event.version,
    });
  }

  async getEvents(aggregateId: string): Promise<StoredEvent[]> {
    const rows = await this.knex
      .db('event_store')
      .where({
        aggregate_id: aggregateId,
      })
      .orderBy('version', 'asc');

    return rows.map((row) => ({
      id: row.id,
      aggregateId: row.aggregate_id,
      aggregateType: row.aggregate_type,
      eventType: row.event_type,
      eventData: row.event_data,
      version: row.version,
      createdAt: row.created_at,
    }));
  }
  async getCurrentVersion(aggregateId: string): Promise<number> {
    const row = await this.knex
      .db('event_store')
      .where({
        aggregate_id: aggregateId,
      })
      .max('version as version')
      .first();

    return row?.version ?? 0;
  }
}
