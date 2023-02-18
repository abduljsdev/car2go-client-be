import { Test, TestingModule } from '@nestjs/testing';
import { RentedCarsService } from './rented-cars.service';

describe('RentedCarsService', () => {
  let service: RentedCarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentedCarsService],
    }).compile();

    service = module.get<RentedCarsService>(RentedCarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
