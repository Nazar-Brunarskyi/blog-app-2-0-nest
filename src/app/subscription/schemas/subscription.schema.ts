import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SUBSCRIPTION_TYPE } from 'src/common/types/enums/subscription';
import { ISubscription } from 'src/common/types/interfaces/subscription';

@Schema()
export class Subscription extends Document implements ISubscription {
  _id: Types.ObjectId; // or string if you prefer

  @Prop({ required: true })
  stripeSubscriptionId: string;

  @Prop({ required: true })
  customerId: string;

  @Prop()
  validUntil: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true, enum: SUBSCRIPTION_TYPE })
  type: SUBSCRIPTION_TYPE;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
