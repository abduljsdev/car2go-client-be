import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserType } from 'src/user/enum/user.enum';

export class RegisterUserDto {
  @Transform((value) => value.value.trim())
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Transform((value) => value.value.trim())
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @Transform((value) => value.value.trim())
  @IsEnum(UserType)
  role: UserType;

  @IsOptional()
  account: any;
}
