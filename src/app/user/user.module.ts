import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), FirebaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
