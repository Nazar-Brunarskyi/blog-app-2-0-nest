import { Module } from '@nestjs/common';
import { StripeService } from './services/stripe.service';
import { StripeController } from './controllers/stripe.controller';
import { UserService } from '../user/services/user.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { UserSchema } from '../user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionService } from '../subscription/services/subscription.service';
import { SubscriptionSchema } from '../subscription/schemas/subscription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Subscription', schema: SubscriptionSchema }]),
    FirebaseModule,
  ],
  controllers: [StripeController],
  providers: [StripeService, UserService, SubscriptionService],
})
export class StripeModule {}
