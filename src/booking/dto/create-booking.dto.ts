import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  pickUpLocation: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  pickUpDate: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  pickUpTime: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  returnLocation: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  returnDate: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  returnTime: string;

  @IsOptional()
  car: any;

  @IsOptional()
  carId: any;

  @IsOptional()
  buyer: any;

  @IsOptional()
  driver: any;

  @IsOptional()
  driverId: any;
}
