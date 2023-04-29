import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  pickUpLocation: string;

  @IsNotEmpty()
  @IsString()
  pickUpDate: string;

  @IsNotEmpty()
  @IsString()
  pickUpTime: string;

  @IsNotEmpty()
  @IsString()
  returnLocation: string;

  @IsNotEmpty()
  @IsString()
  returnDate: string;

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
