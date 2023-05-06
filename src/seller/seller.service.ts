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

  async findAllWithUser(userId: number) {
    const data = await this.carRepository.find({
      where: {
        userId,
      },
      relations: {
        user: true,
      },
    });
    return data;
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
  show(id: number) {
    return this.carRepository.findOneBy({ id });
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

  async findWithinRadius(lat: number, lon: number, radius: number) {
    const earthRadius = 6371; // km
    const maxLat = lat + (radius / earthRadius) * (180 / Math.PI);
    const minLat = lat - (radius / earthRadius) * (180 / Math.PI);
    const maxLon =
      lon +
      ((radius / earthRadius) * (180 / Math.PI)) /
        Math.cos((lat * Math.PI) / 180);
    const minLon =
      lon -
      ((radius / earthRadius) * (180 / Math.PI)) /
        Math.cos((lat * Math.PI) / 180);

    const query = this.carRepository
      .createQueryBuilder('car')
      .select()
      .where('car.latitude BETWEEN :minLat AND :maxLat', {
        minLat,
        maxLat,
      })
      .andWhere('car.longitude BETWEEN :minLon AND :maxLon', {
        minLon,
        maxLon,
      });

    return await query.getMany();
  }
}
