import { IsString, IsEmail, IsOptional } from 'class-validator';
import { UserType } from '../enum/user.enum';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @Transform((value) => value.value.trim())
  @IsString()
  @IsOptional()
  firstName: string;

  @Transform((value) => value.value.trim())
  @IsString()
  @IsOptional()
  lastName: string;

  @Transform((value) => value.value.trim())
  @IsString()
  @IsOptional()
  role: UserType.SELLER | UserType.BUYER;
}
