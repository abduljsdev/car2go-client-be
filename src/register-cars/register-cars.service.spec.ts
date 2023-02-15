import { Test, TestingModule } from '@nestjs/testing';
import { RegisterCarsService } from './register-cars.service';

describe('RegisterCarsService', () => {
  let service: RegisterCarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterCarsService],
    }).compile();

    service = module.get<RegisterCarsService>(RegisterCarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
