import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';

@Schema()
class User {
  @Prop({ unique: true })
  userName: string;

  @Prop({ required: true, unique: true })
  firebaseId: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
