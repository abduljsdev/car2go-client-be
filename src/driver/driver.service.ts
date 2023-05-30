import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}
  create(createDriverDto: CreateDriverDto) {
    const registerDriver = this.driverRepository.create({
      ...createDriverDto,
    });
    return this.driverRepository.save(registerDriver);
  }

  findAll() {
    return this.driverRepository.find();
  }

  findOne(id: number) {
    return this.driverRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  filterOneDriver(options: any) {
    return this.driverRepository.findOne({
      where: options,
    });
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  activateDriver(id: number) {
    return this.driverRepository.update(id, { isActive: true });
  }

  updateWithOptions(id: number, options: any) {
    console.log(id,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    
    return this.driverRepository.update(id, options);
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
