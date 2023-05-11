import { Transform, Type } from 'class-transformer';
import { Contains, IsEnum, IsOptional, IsString } from 'class-validator';
import { CarCategories, CarTransmission } from '../enum/car.enum';
export class UpdateCarDto {
  @Transform((value) => value.value.trim())
  @IsOptional()
  // @Contains('', { message: 'Car Name is not empty' })
  @IsString()
  name: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  // @Contains('', { message: 'Brand Name is not empty' })
  @IsString()
  brandName: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  // @Contains('', { message: 'Model is not empty' })
  @IsString()
  model: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  // @Contains('', { message: 'Number is not empty' })
  @IsString()
  number: string;

  @IsOptional()
  // @Contains('', { message: 'Transmission is not empty' })
  @IsEnum(CarTransmission)
  transmission: CarTransmission;

  @IsOptional()
  // @Contains('', { message: 'Price is not empty' })
  @IsString()
  price: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  // @Contains('', { message: 'Seats is not empty' })
  @IsString()
  seats: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  // @Contains('', { message: 'Fuel average is not empty' })
  @IsString()
  fuelAverage: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  // @Contains('', { message: 'Doors is not empty' })
  @IsString()
  doors: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  // @Contains('', { message: 'Category is not empty' })
  category: CarCategories.SEDAN | CarCategories.SUV | CarCategories.VAN;

  @Transform((value) => value.value.trim())
  @IsOptional()
  // @Contains('', { message: 'Luggage capacity is not empty' })
  @IsString()
  luggageCapacity: string;

  @Transform((value) => value.value.trim())
  @IsOptional()
  // @Contains('', { message: 'Passenger capacity is not empty' })
  @IsString()
  passengerCapacity: string;

  @IsOptional()
  // @Contains('', { message: 'Location is not empty' })
  @IsString()
  location: string;

  @IsOptional()
  image: string;
}
