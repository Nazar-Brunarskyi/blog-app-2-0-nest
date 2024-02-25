import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IUser } from 'src/common/types/interfaces/user';

@Schema()
class User implements IUser {
  _id: Types.ObjectId; // or string if you prefer

  @Prop({ unique: true })
  userName: string;

  @Prop({ required: true, unique: true })
  firebaseId: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'Subscription' }) // This line sets up the reference
  subscription: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
