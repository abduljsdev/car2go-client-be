import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/seller/entities/car.entity';
import { Booking } from './entities/booking.entity';
import { User } from 'src/user/entities/user.entity';
import { Driver } from 'src/driver/entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), Car, User, Driver],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
