import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserNameDto } from '../dto/create-user-name.dto';
import { FirebaseAuthGuard, FirebaseAuthInternalGuard } from 'src/common/guards';
import { GetUser } from 'src/common/decorators/get-user-from-request.decorator';
import { IUser } from 'src/common/types/interfaces/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/fb-id')
  @UseGuards(FirebaseAuthInternalGuard)
  findByFirebaseUid(@GetUser() user: IUser) {
    return this.userService.findByFirebaseUid(user.firebaseId);
  }

  @Post('check-user-name')
  checkUserName(@Body() queryParams: CreateUserNameDto) {
    return this.userService.checkUserName(queryParams.userName);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
