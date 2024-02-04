import { Module } from '@nestjs/common';
import { StripeService } from './services/stripe.service';
import { StripeController } from './controllers/stripe.controller';
import { UserService } from '../user/services/user.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { UserSchema } from '../user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), FirebaseModule],
  controllers: [StripeController],
  providers: [StripeService, UserService],
})
export class StripeModule {}
