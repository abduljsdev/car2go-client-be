import { IsString, IsEmail, IsOptional } from 'class-validator'
import {Type} from "class-transformer";
import { UserType } from '../enum/user.enum';

export class UpdateUserDto {
  

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  role:UserType.SELLER | UserType.BUYER;
}
