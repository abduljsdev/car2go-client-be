import { IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsOptional()
  car: any;

  @IsOptional()
  carId: any;

  @IsOptional()
  buyer: any;
}
