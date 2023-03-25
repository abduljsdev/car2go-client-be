import { IsString, IsEmail, IsOptional } from 'class-validator';
import { UserType } from '../enum/user.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  role: UserType.SELLER | UserType.BUYER;
}
