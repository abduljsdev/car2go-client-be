import { Transform, Type } from 'class-transformer';
import {
  Contains,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateAccountDto {
  @Transform((value) => value.value.trim())
  @IsOptional()
  @IsString()
  @Contains('', { message: 'FirstName is not empty' })
  firstName: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  @Contains('', { message: 'LastName is not empty' })
  @IsString()
  lastName: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  @Contains('', { message: 'Date of birth is not empty' })
  @IsString()
  dateOfBirth: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  @Contains('', { message: 'City is not empty' })
  @IsString()
  city: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  @Contains('', { message: 'street is not empty' })
  @IsString()
  street: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  @Contains('', { message: 'Phone number is not empty' })
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  @Contains('', { message: 'CNIC Number is not empty' })
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
