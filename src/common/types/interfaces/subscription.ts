import { Types } from 'mongoose';
import { SUBSCRIPTION_TYPE } from '../enums/subscription';

export interface ISubscription {
  _id: Types.ObjectId;
  stripeSubscriptionId: string;
  customerId: string;
  validUntil: Date;
  userId: string;
  type: SUBSCRIPTION_TYPE;
}
