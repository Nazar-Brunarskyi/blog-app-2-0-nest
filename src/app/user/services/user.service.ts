import { ConflictException, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { userName, email, firebaseId } = createUserDto;

    const existingUser = await this.userModel.findOne({ userName });
    if (existingUser) {
      throw new ConflictException(`User with username '${userName}' already exists`);
    }

    const newUser = new this.userModel({
      userName,
      firebaseId,
      email,
    });

    return await newUser.save();
  }

  findAll() {
    return 'findAll';
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findByFirebaseUid(firebaseId: string) {
    return this.userModel.findOne({ firebaseId });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async checkUserName(userName: string) {
    const existingUser = await this.userModel.findOne({ userName });

    if (existingUser) {
      return true;
    }

    return false;
  }
}
