import { Module } from '@nestjs/common';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionController } from './controllers/subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionSchema } from './schemas/subscription.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { StripeService } from '../stripe/services/stripe.service';
import { UserService } from '../user/services/user.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subscription', schema: SubscriptionSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    FirebaseModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, StripeService, UserService],
})
export class SubscriptionModule {}
