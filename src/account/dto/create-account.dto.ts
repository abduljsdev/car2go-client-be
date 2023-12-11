import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAccountDto {
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
  dateOfBirth: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  city: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  street: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  @MaxLength(15)
  cnicNumber: string;

  @IsOptional()
  @IsString()
  idCardFrontImage: string;

  @IsOptional()
  @IsString()
  idCardBackImage: string;
}
