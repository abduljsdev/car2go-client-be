import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { CarCategories } from '../enum/car.enum';
import { Type } from 'class-transformer';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  brandName: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  model: number;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @Type(() => Boolean)
  transmission: boolean;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  seats: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  fuelAverage: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  doors: number;

  @IsNotEmpty()
  category: CarCategories.SEDAN | CarCategories.SUV | CarCategories.VAN;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  luggageCapacity: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  passengerCapacity: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  image: string;

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;

  @IsOptional()
  user: any;
}
