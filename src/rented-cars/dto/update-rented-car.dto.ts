import { PartialType } from '@nestjs/mapped-types';
import { CreateRentedCarDto } from './create-rented-car.dto';

export class UpdateRentedCarDto extends PartialType(CreateRentedCarDto) {}
