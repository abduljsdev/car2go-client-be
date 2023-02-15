import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegisterCarDto } from './dto/create-register-car.dto';
import { UpdateRegisterCarDto } from './dto/update-register-car.dto';
import { RegisterCar } from './entities/register-car.entity';

@Injectable()
export class RegisterCarsService {
  constructor(
    @InjectRepository(RegisterCar)
    private readonly registerCarRepository: Repository<RegisterCar>,
  ) {}

  create(createRegisterCarDto: CreateRegisterCarDto) {
    const registerCar = this.registerCarRepository.create({
      ...createRegisterCarDto,
    });
    return this.registerCarRepository.save(registerCar);

    // const registerCar = new RegisterCar();
    // registerCar.userId = createRegisterCarDto.userId;
    // registerCar.name = createRegisterCarDto.name;
    // registerCar.brandName = createRegisterCarDto.brandName;
    // registerCar.model = createRegisterCarDto.model
    // registerCar.number = createRegisterCarDto.number;
    // registerCar.transmission = createRegisterCarDto.transmission;
    // registerCar.price = createRegisterCarDto.price;
    // registerCar.seats = createRegisterCarDto.seats;
    // registerCar.fuelAverage = createRegisterCarDto.fuelAverage;
    // registerCar.doors = createRegisterCarDto.doors;
    // registerCar.category = createRegisterCarDto.category;
    // registerCar.luggageCapacity = createRegisterCarDto.luggageCapacity;
    // registerCar.passangerCapcity = createRegisterCarDto.passangerCapcity;
    // registerCar.location = createRegisterCarDto.location;
    // registerCar.image = createRegisterCarDto.image;
    // return this.registerCarRepository.save(registerCar);
  }

  findAll() {
    return this.registerCarRepository.find();
  }

  findOne(id: number) {
    return this.registerCarRepository.findOneBy({ id });
  }
  update(id: number, updateRegisterCarDto: UpdateRegisterCarDto) {
    return `This action updates a #${id} registerCar`;
  }

  remove(id: number) {
    return `This action removes a #${id} registerCar`;
  }
}
