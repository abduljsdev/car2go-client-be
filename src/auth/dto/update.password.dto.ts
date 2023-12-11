import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UpdatePasswordDto {
  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  password: string;
}
