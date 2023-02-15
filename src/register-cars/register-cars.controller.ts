import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile,BadRequestException } from '@nestjs/common';
import { RegisterCarsService } from './register-cars.service';
import { CreateRegisterCarDto } from './dto/create-register-car.dto';
import { UpdateRegisterCarDto } from './dto/update-register-car.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadToCloudinary } from 'src/helpers/db-helpers';

@Controller('register-cars')
export class RegisterCarsController {
  constructor(private readonly registerCarsService: RegisterCarsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
 async create(@Body() createRegisterCarDto: CreateRegisterCarDto,@UploadedFile() image: Express.Multer.File,) {    
    if (image) {

        const resultImg = await uploadToCloudinary(image.buffer, 'image') as string;
        return this.registerCarsService.create({ ...createRegisterCarDto, ...{ image: resultImg }});
      } 
    else {
      throw new BadRequestException('Please upload image');
    }
  }

  @Get()
  findAll() {
    return this.registerCarsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registerCarsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegisterCarDto: UpdateRegisterCarDto) {
    return this.registerCarsService.update(+id, updateRegisterCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerCarsService.remove(+id);
  }
}
