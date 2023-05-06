import { Type } from 'class-transformer';
import { Contains, IsNumber, IsOptional, IsString } from 'class-validator';
import { CarCategories } from '../enum/car.enum';
export class UpdateCarDto {
  @IsOptional()
  @Contains('', { message: 'Car Name is not empty' })
  @IsString()
  name: string;

  @IsOptional()
  @Contains('', { message: 'Brand Name is not empty' })
  @IsString()
  brandName: string;

  @IsOptional()
  // @Contains('', { message: 'Model is not empty' })
  @Type(() => Number)
  @IsNumber()
  model: number;

  @IsOptional()
  // @Contains('', { message: 'Number is not empty' })
  @IsString()
  number: string;

  @IsOptional()
  // @Contains('', { message: 'Transmission is not empty' })
  @Type(() => Boolean)
  transmission: boolean;

  @IsOptional()
  // @Contains('', { message: 'Price is not empty' })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsOptional()
  // @Contains('', { message: 'Seats is not empty' })
  @Type(() => Number)
  @IsNumber()
  seats: number;

  @IsOptional()
  // @Contains('', { message: 'Fuel average is not empty' })
  @Type(() => Number)
  @IsNumber()
  fuelAverage: number;

  @IsOptional()
  // @Contains('', { message: 'Doors is not empty' })
  @IsNumber()
  @Type(() => Number)
  doors: number;

  @IsOptional()
  // @Contains('', { message: 'Category is not empty' })
  category: CarCategories.SEDAN | CarCategories.SUV | CarCategories.VAN;

  @IsOptional()
  // @Contains('', { message: 'Luggage capacity is not empty' })
  @Type(() => Number)
  luggageCapacity: number;

  @IsOptional()
  // @Contains('', { message: 'Passenger capacity is not empty' })
  @Type(() => Number)
  @IsNumber()
  passengerCapacity: number;

  @IsOptional()
  @Contains('', { message: 'Location is not empty' })
  @IsString()
  location: string;

  @IsOptional()
  image: string;
}
