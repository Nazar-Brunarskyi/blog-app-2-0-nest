import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from './app/firebase/firebase.module';
import { UserModule } from './app/user/user.module';
import { StripeModule } from './app/stripe/stripe.module';
import { SubscriptionModule } from './app/subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODM_URI),
    FirebaseModule,
    UserModule,
    StripeModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
