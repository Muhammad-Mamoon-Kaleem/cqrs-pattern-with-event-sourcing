export interface StoredEvent {
  id?: number;

  aggregateId: string;

  aggregateType: string;

  eventType: string;

  eventData: Record<string, any>;

  version: number;

  createdAt?: Date;
}
