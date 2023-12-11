import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerificationCodeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  verification_code: string;
}
