import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { SellerService } from './../seller/seller.service';

@Controller('booking')
@UseGuards(AuthGuard('jwt'))
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly sellerService: SellerService,
  ) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    const carData = await this.sellerService.filterOneCar({
      id: createBookingDto.carId,
      isActive: false,
    });
    if (!carData) {
      throw new BadRequestException('already book');
    }
    createBookingDto.buyer = req.user;
    createBookingDto.car = carData;
    const bookingData = await this.bookingService.create(createBookingDto);
    if (bookingData) {
      await this.sellerService.updateWithOptions(createBookingDto.carId, {
        isActive: true,
      });
    }
    return bookingData;
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Patch(':id')
  cancelBooking(@Param('id') id: string) {
    return true;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
