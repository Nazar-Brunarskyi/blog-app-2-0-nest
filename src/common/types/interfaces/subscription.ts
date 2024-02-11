import { Types } from 'mongoose';
import { SUBSCRIPTION_TYPE } from '../enums/subscription';

export interface ISubscription {
  _id: Types.ObjectId; // or string if you prefer
  stripeSubscriptionId: string;
  customerId: string;
  validUntil: Date;
  isValid: boolean;
  userId: string;
  type: SUBSCRIPTION_TYPE;
}
