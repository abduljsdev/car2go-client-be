import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}
  create(createCarDto: CreateCarDto) {
    console.log(createCarDto);

    const registerCar = this.carRepository.create({
      ...createCarDto,
    });
    return this.carRepository.save(registerCar);
  }

  findAll() {
    return this.carRepository.find({
      relations: {
        user: true,
      },
    });
  }

  findOne(id: number, userId: any) {
    return this.carRepository.findOne({
      where: {
        userId,
        id,
      },
      relations: {
        user: true,
      },
    });
  }
  findCar(id: number) {
    return this.carRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id,
      },
    });
  }
  update(id: number, updateCartDo: UpdateCarDto) {
    return this.carRepository.update(id, updateCartDo);
  }

  remove(id: number) {
    return this.carRepository.delete(id);
  }
}
