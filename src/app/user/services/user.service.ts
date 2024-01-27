import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  findAll() {
    const newUser = new this.userModel({
      userName: 'nnazar836',
      firebaseId: 'akncbdsbviasdvbagiusdvb',
      email: 'nnazar836@gmail.com',
    });

    return newUser.save();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
