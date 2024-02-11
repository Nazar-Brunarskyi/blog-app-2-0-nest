import { SUBSCRIPTION_TYPE } from '../../enums/subscription';

export interface ICreateSubscriptionDto {
  subscriptionId: string;
  type: SUBSCRIPTION_TYPE;
  customerId: string;
  userId: string;
}
