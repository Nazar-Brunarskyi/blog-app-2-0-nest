import { Module } from '@nestjs/common';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionController } from './controllers/subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionSchema } from './schemas/subscription.schema';
import { UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subscription', schema: SubscriptionSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
