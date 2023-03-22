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
  @Contains('', { message: 'FirstName is not empty' })
  @IsString()
  lastName: string;

  @IsOptional()
  @Contains('', { message: 'FirstName is not empty' })
  @IsString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @Contains('', { message: 'FirstName is not empty' })
  @IsString()
  street: string;

  @IsOptional()
  @Contains('', { message: 'FirstName is not empty' })
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber: string;

  @IsOptional()
  @Contains('', { message: 'FirstName is not empty' })
  @IsString()
  @MinLength(12)
  @MaxLength(12)
  cnicNumber: string;

  @IsOptional()
  @IsString()
  idCardFrontImage: string;

  @IsOptional()
  @IsString()
  idCardBackImage: string;

  @IsOptional()
  @Contains('', { message: 'FirstName is not empty' })
  @Type(() => Boolean)
  @IsBoolean()
  verify: boolean;
}
