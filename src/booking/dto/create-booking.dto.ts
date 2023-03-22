import { IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsOptional()
  car: any;

  @IsOptional()
  buyer: any;

  @IsOptional()
  status: string;
}
