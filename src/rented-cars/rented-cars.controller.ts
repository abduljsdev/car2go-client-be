import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RentedCarsService } from './rented-cars.service';
import { CreateRentedCarDto } from './dto/create-rented-car.dto';
import { UpdateRentedCarDto } from './dto/update-rented-car.dto';
import { RegisterCarsService } from 'src/register-cars/register-cars.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('rented-cars')
export class RentedCarsController {
  constructor(
    private readonly rentedCarsService: RentedCarsService,
    private registerCarService: RegisterCarsService,
  ) {}

  @Post()
  async create(@Body() createRentedCarDto: CreateRentedCarDto, @Req() req) {
    const responseData = await this.registerCarService.findCar(1);
    console.log(responseData);

    createRentedCarDto.car = responseData;
    createRentedCarDto.buyer = req.user;
    createRentedCarDto.status = 'booked';
    return this.rentedCarsService.create(createRentedCarDto);
  }

  @Get()
  findAll(@Req() req) {
    const buyerId = req.user.id;
    return this.rentedCarsService.findAll(buyerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const buyerId = req.user.id;
    return this.rentedCarsService.findOne(+id, buyerId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRentedCarDto: UpdateRentedCarDto,
  ) {
    return this.rentedCarsService.update(+id, updateRentedCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentedCarsService.remove(+id);
  }
}
