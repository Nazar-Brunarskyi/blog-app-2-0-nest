import { Controller, Post, UseGuards } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';
import { GetUser } from '../../../common/decorators/get-user-from-request.decorator';
import { IUser } from '../../../common/types/interfaces/user';
import { FirebaseAuthInternalGuard } from '../../../common/guards';
import { StripeService } from '../../stripe/services/stripe.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly stripeService: StripeService,
  ) {}

  @Post('start-prime-subscription')
  @UseGuards(FirebaseAuthInternalGuard)
  createPremiumSubscription(@GetUser() user: IUser) {
    return this.stripeService.createPremiumSubscriptionSession(user);
  }
}
