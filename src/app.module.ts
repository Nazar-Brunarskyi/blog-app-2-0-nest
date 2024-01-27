import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from './app/firebase/firebase.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODM_URI), FirebaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
