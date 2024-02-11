import { Controller, Param, Post, RawBodyRequest, Req, UseGuards } from '@nestjs/common';
import { StripeService } from '../services/stripe.service';
import { FirebaseAuthInternalGuard } from '../../../common/guards';
import { GetUser } from '../../../common/decorators/get-user-from-request.decorator';
import { IUser } from '../../../common/types/interfaces/user';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('start-prime-subscription')
  @UseGuards(FirebaseAuthInternalGuard)
  createPremiumSubscription(@GetUser() user: IUser) {
    return this.stripeService.createPremiumSubscription(user);
  }

  @Post('webhooks')
  handleWebhookEvent(@Req() req: RawBodyRequest<Request>) {
    const payload = req.rawBody;
    const signature = req.headers['stripe-signature'];

    return this.stripeService.handleStripeEvent(payload, signature);
  }

  @Post('/cancel-subscription/:subscriptionId')
  getCustomer(@Param('subscriptionId') subscriptionId: string) {
    return this.stripeService.cancelSubscription(subscriptionId);
  }
}
