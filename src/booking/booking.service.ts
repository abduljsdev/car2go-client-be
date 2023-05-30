import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}
  create(createBookingDto: CreateBookingDto) {
    const registerCar = this.bookingRepository.create({
      ...createBookingDto,
    });
    return this.bookingRepository.save(registerCar);
  }

  findAll() {
    return `This action returns all booking`;
  }
  findAllWithUser(userId: number) {
    return this.bookingRepository.find({
      where: {
        buyerId: userId,
      },
      relations: {
        car: true,
      },
    });
  }

  findOne(id: number, userId: number) {
    return this.bookingRepository.findOne({
      where: {
        id: id,
        buyerId: userId,
      },
      relations: {
        car: true,
      },
    });
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
