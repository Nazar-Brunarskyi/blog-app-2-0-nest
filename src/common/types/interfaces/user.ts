import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  userName: string;
  firebaseId: string;
  email: string;
}
