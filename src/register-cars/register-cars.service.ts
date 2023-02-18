import { Injectable, Req } from '@nestjs/common';
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

  create(createRegisterCarDto: CreateRegisterCarDto,) {
    const registerCar = this.registerCarRepository.create({
      ...createRegisterCarDto,
    });
    return this.registerCarRepository.save(registerCar);
  }

  findAll(userId:any) {
    return this.registerCarRepository.find({
      where:{
        userId,
      },
      relations:{
        user:true,
      }
    });
  }

  findOne(id: number,userId:any) {
    return this.registerCarRepository.findOne({ 
      relations:{
        user:true,
      },
      where:{
        userId,
        id,
      },
       });
  }
  findCar(id: number) {
    return this.registerCarRepository.findOne({ 
      relations:{
        user:true,
      },
      where:{
        id,
      },
       });
  }
  update(id: number, updateRegisterCarDto: UpdateRegisterCarDto) {
    return this.registerCarRepository.update(id, updateRegisterCarDto);
  }

  remove(id: number) {
    return this.registerCarRepository.delete(id);
  }
}
