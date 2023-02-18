import { Test, TestingModule } from '@nestjs/testing';
import { RentedCarsController } from './rented-cars.controller';
import { RentedCarsService } from './rented-cars.service';

describe('RentedCarsController', () => {
  let controller: RentedCarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentedCarsController],
      providers: [RentedCarsService],
    }).compile();

    controller = module.get<RentedCarsController>(RentedCarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
