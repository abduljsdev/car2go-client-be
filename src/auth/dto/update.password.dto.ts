import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}