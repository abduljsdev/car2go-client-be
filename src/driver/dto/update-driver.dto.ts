import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDriverDto {
  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  cnic: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  license: string;
}
