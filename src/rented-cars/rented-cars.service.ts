import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterCarsService } from 'src/register-cars/register-cars.service';
import { Repository } from 'typeorm';
import { CreateRentedCarDto } from './dto/create-rented-car.dto';
import { UpdateRentedCarDto } from './dto/update-rented-car.dto';
import { RentedCar } from './entities/rented-car.entity';

@Injectable()
export class RentedCarsService {
  constructor(
    @InjectRepository(RentedCar)
    private readonly rentedCarRepository:Repository<RentedCar>,
    private registerCarService:RegisterCarsService,
    
  ){}
 async create(createRentedCarDto: CreateRentedCarDto) {
    const bookCar = this.rentedCarRepository.create({
      ...createRentedCarDto
    })
    this.rentedCarRepository.save(bookCar);       
  }

  findAll(buyerId:any) {
     return this.rentedCarRepository.find({
      where:{
        buyerId,
      },
      relations:{
        car:{
          user:true,
        },
        buyer:true,
      }
    })
  }

  findOne(id: number, buyerId:any) {
    console.log(buyerId);
    
    return this.rentedCarRepository.find({
      where:{
        id,
        buyerId,
      },
      relations:{
        car:{
          user:true,
        },
        buyer:true,
      }
    })
  }

  update(id: number, updateRentedCarDto: UpdateRentedCarDto) {
    return `This action updates a #${id} rentedCar`;
  }

  remove(id: number) {
    return `This action removes a #${id} rentedCar`;
  }
}