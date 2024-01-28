import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserNameDto {
  @IsNotEmpty()
  @IsString()
  userName: string;
}
