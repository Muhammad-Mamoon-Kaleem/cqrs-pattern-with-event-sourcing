import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema({
  collection: 'accounts',
})
export class Account {
  @Prop({ required: true, unique: true })
  accountId: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    default: 0,
  })
  balance: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
