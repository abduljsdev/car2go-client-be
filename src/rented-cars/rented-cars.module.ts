import { Module } from '@nestjs/common';
import { RentedCarsService } from './rented-cars.service';
import { RentedCarsController } from './rented-cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentedCar } from './entities/rented-car.entity';
import { RegisterCarsModule } from 'src/register-cars/register-cars.module';

@Module({
  imports: [TypeOrmModule.forFeature([RentedCar]),RegisterCarsModule],
  controllers: [RentedCarsController],
  providers: [RentedCarsService]
})
export class RentedCarsModule {}
