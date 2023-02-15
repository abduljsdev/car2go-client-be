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
  }

  findAll() {
    return this.registerCarRepository.find();
  }

  findOne(id: number) {
    return this.registerCarRepository.findOneBy({ id });
  }
  update(id: number, updateRegisterCarDto: UpdateRegisterCarDto) {
    return this.registerCarRepository.update(id, updateRegisterCarDto);
  }

  remove(id: number) {
    return this.registerCarRepository.delete(id);
  }
}
