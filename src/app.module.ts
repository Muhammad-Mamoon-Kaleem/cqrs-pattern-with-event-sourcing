import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from './database/knex/knex.module';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreModule } from './event-store/event-store.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');

        Logger.log(`Mongo URI: ${uri}`);

        return {
          uri,
        };
      },
    }),

    KnexModule,
    CqrsModule,
    EventStoreModule,
    AccountModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
