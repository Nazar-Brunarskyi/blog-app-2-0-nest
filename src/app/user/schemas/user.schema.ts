import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from 'src/common/types/interfaces/user';

@Schema()
class User implements IUser {
  @Prop({ unique: true })
  userName: string;

  @Prop({ required: true, unique: true })
  firebaseId: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
