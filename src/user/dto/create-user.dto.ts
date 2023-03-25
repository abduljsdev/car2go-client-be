import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { UserType } from '../enum/user.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  role: UserType.SELLER | UserType.BUYER;

  @IsOptional()
  account: any;
}
