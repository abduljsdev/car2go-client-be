import { IsOptional, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { CarCategories, CarTransmission } from '../enum/car.enum';
import { Transform } from 'class-transformer';

export class CreateCarDto {
  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  name: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  brandName: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  model: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsEnum(CarTransmission)
  transmission: CarTransmission;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  price: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  seats: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  fuelAverage: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  doors: string;

  @IsNotEmpty()
  category: CarCategories.SEDAN | CarCategories.SUV | CarCategories.VAN;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  luggageCapacity: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  passengerCapacity: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  image: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  latitude: string;

  @Transform((value) => value.value.trim())
  @IsNotEmpty()
  longitude: string;

  @IsOptional()
  user: any;
}
