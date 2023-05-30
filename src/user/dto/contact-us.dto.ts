import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ContactUsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
