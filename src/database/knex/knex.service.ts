import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';

@Injectable()
export class KnexService implements OnModuleDestroy {
  private readonly knex: Knex;

  constructor(config: ConfigService) {
    this.knex = knex({
      client: 'pg',
      connection: {
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        user: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
      },
      pool: {
        min: 2,
        max: 10,
      },
    });
  }

  get db(): Knex {
    return this.knex;
  }

  async onModuleDestroy() {
    await this.knex.destroy();
  }
}
