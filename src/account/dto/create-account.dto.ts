import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @MaxLength(12)
  phoneNumber: string;

  @IsNotEmpty()
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
}
