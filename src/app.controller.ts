import { Controller, Get } from '@nestjs/common';
import { KnexService } from './database/knex/knex.service';

@Controller()
export class AppController {
  constructor(private readonly knexService: KnexService) {}

  @Get('/health')
  test() {
    // await this.knexService.db.raw('SELECT NOW()');

    return {
      postgres: 'connected',
      message: 'Application is running',
    };
  }
}
