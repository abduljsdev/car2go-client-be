import { Module } from '@nestjs/common';
import { RegisterCarsService } from './register-cars.service';
import { RegisterCarsController } from './register-cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterCar } from './entities/register-car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterCar])],
  controllers: [RegisterCarsController],
  providers: [RegisterCarsService]
})
export class RegisterCarsModule {}
