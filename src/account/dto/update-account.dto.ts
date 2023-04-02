import { Type } from 'class-transformer';
import {
  Contains,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @Contains('', { message: 'FirstName is not empty' })
  firstName: string;

  @IsOptional()
  @Contains('', { message: 'LastName is not empty' })
  @IsString()
  lastName: string;

  @IsOptional()
  @Contains('', { message: 'Date of birth is not empty' })
  @IsString()
  dateOfBirth: string;

  @IsOptional()
  @Contains('', { message: 'City is not empty' })
  @IsString()
  city: string;

  @IsOptional()
  @Contains('', { message: 'street is not empty' })
  @IsString()
  street: string;

  @IsOptional()
  @Contains('', { message: 'Phone number is not empty' })
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber: string;

  @IsOptional()
  @Contains('', { message: 'CNIC Number is not empty' })
  @IsString()
  @MinLength(13)
  @MaxLength(13)
  cnicNumber: string;

  @IsOptional()
  @IsString()
  idCardFrontImage: string;

  @IsOptional()
  @IsString()
  idCardBackImage: string;
}
