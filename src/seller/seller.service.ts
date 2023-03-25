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
  filterOneCar(options: any) {
    return this.carRepository.findOne({
      relations: {
        user: true,
      },
      where: options,
    });
  }
  update(id: number, updateCartDo: UpdateCarDto) {
    return this.carRepository.update(id, updateCartDo);
  }
  updateWithOptions(id: number, options: any) {
    return this.carRepository.update(id, options);
  }

  remove(id: number) {
    return this.carRepository.delete(id);
  }
}
