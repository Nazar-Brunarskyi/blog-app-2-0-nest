import { BadRequestException, Injectable } from '@nestjs/common';
import { SubscriptionService } from 'src/app/subscription/services/subscription.service';
import { IUser } from 'src/common/types/interfaces/user';
import Stripe from 'stripe';
import { DateTime } from 'luxon';
import { SUBSCRIPTION_TYPE } from 'src/common/types/enums/subscription';
@Injectable()
export class StripeService {
  stripe: Stripe;

  constructor(private readonly subscriptionService: SubscriptionService) {
    this.stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, { apiVersion: '2023-10-16' });
  }

  async cancelSubscription(SubscriptionId: string) {
    const subscription = await this.stripe.subscriptions.retrieve(SubscriptionId);

    return this.stripe.subscriptions.cancel(subscription.id);
  }

  async createCustomer(email: string) {
    return this.stripe.customers.create({
      email,
    });
  }

  async createPremiumSubscription(user: IUser) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: [
        {
          price: process.env.PREMIUM_SUBSCRIPTION_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `http://localhost:4000/`,
      cancel_url: `http://localhost:4000/`,
      subscription_data: {
        metadata: { userId: user._id.toString() },
      },
    });

    return session.url;
  }

  async handleStripeEvent(payload: Buffer, signature: string) {
    try {
      const event = this.stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_ENDPOINTS_SECRET);

      switch (event.type) {
        case 'customer.subscription.created':
          const subscriptionCreated = event.data.object;
          const customerId = subscriptionCreated.customer as string;
          const userId = subscriptionCreated.metadata.userId;

          await this.subscriptionService.create({
            customerId: customerId,
            subscriptionId: subscriptionCreated.id,
            type: SUBSCRIPTION_TYPE.PRIME,
            userId,
          });

          break;
        case 'invoice.payment_succeeded':
          const invoicePaymentSucceeded = event.data.object;
          const subscriptionId = invoicePaymentSucceeded.subscription as string;
          const paidUntilDate = DateTime.fromSeconds(invoicePaymentSucceeded.lines.data[0].period.end).toJSDate();

          await this.subscriptionService.updateSubscriptionValidity(subscriptionId, paidUntilDate);

          break;
        case 'customer.subscription.deleted':
          const subscriptionDeleted = event.data.object;
          await this.subscriptionService.remove(subscriptionDeleted.id);
          break;
        default:
          break;
      }

      return {
        result: 'OK',
      };
    } catch (err) {
      console.log(err);

      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }
  }
}
