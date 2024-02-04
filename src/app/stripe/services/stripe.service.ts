import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, { apiVersion: '2023-10-16' });
  }

  async getCustomer() {
    const subscription = await this.stripe.subscriptions.retrieve('sub_1Og8HLGw3sqYV6TcUvAKJDHu');

    return this.stripe.subscriptions.cancel(subscription.id);
  }

  async createCustomer(email: string) {
    return this.stripe.customers.create({
      email,
    });
  }

  async createPremiumSubscription(email: string) {
    console.log(email);

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // customer_email: email,
      line_items: [
        {
          price: 'price_1Og4igGw3sqYV6TcBhRJjIPq',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `http://localhost:4000/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:4000/`,
    });

    return session.url;
  }

  handleStripeEvent(payload: Buffer, signature: string) {
    try {
      const event = this.stripe.webhooks.constructEvent(payload, signature, 'whsec_2pJ7rYS6mP8ju2ZUB3tnYsrqKvgjOAKE');

      switch (event.type) {
        case 'customer.subscription.created':
          // const subscriptionCreated = event.data.object;
          // console.log('customer.subscription.created', subscriptionCreated);

          break;
        case 'customer.subscription.updated':
          const subscriptionUpdated = event.data.object;
          console.log('customer.subscription.updated', subscriptionUpdated);
          break;
        case 'customer.subscription.deleted':
          // const subscriptionDeleted = event.data.object;
          console.log('customer.subscription.deleted');
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
