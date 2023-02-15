
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { UserType } from '../enum/user.enum';
import { Type } from 'class-transformer';

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

  @IsNotEmpty()
  @IsString()
  phone:number

  @IsNotEmpty()
  @IsString()
  address:string

  @IsNotEmpty()
  @Type(() => Number)
  age:number

  @IsNotEmpty()
  @IsString()
  gender:string

  @IsString()
  @IsOptional()
  role: UserType.SELLER | UserType.BUYER;
}
