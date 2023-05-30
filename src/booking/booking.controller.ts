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
  ConflictException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { SellerService } from './../seller/seller.service';
import { DriverService } from 'src/driver/driver.service';
import { UserService } from 'src/user/user.service';

@Controller('booking')
@UseGuards(AuthGuard('jwt'))
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly sellerService: SellerService,
    private readonly userService: UserService,
    private readonly driverService: DriverService,
  ) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    const carData = await this.sellerService.filterOneCar({
      id: createBookingDto.carId,
      isActive: false,
    });
    if (!carData) {
      throw new ConflictException('This Car already book');
    }
    const userData = await this.userService.findOne(req.user.id);
    createBookingDto.buyer = userData;
    createBookingDto.car = carData;
    createBookingDto.driver = createBookingDto.driverId;
    const bookingData = await this.bookingService.create(createBookingDto);
    if (bookingData) {
      await this.sellerService.updateWithOptions(createBookingDto.carId, {
        isActive: true,
      });

      await this.driverService.updateWithOptions(createBookingDto.driverId.id, {
        isActive: true,
      });
    }
    return bookingData;
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get('all-data')
  findAllWithUser(@Req() req) {
    return this.bookingService.findAllWithUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.bookingService.findOne(+id, req.user.id);
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
