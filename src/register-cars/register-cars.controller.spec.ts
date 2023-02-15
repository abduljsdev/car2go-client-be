import { Test, TestingModule } from '@nestjs/testing';
import { RegisterCarsController } from './register-cars.controller';
import { RegisterCarsService } from './register-cars.service';

describe('RegisterCarsController', () => {
  let controller: RegisterCarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterCarsController],
      providers: [RegisterCarsService],
    }).compile();

    controller = module.get<RegisterCarsController>(RegisterCarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
