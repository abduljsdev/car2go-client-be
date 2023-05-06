import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDriverDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  cnic: string;

  @IsNotEmpty()
  @IsString()
  license: string;
}
