import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile,BadRequestException, Req, UseGuards } from '@nestjs/common';
import { RegisterCarsService } from './register-cars.service';
import { CreateRegisterCarDto } from './dto/create-register-car.dto';
import { UpdateRegisterCarDto } from './dto/update-register-car.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadToCloudinary } from 'src/utils/helpers/db-helpers';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('register-car')
export class RegisterCarsController {
  constructor(private readonly registerCarsService: RegisterCarsService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
 async create(@Body() createRegisterCarDto: any,@Req() req, @UploadedFile() image: Express.Multer.File,) {    
  console.log(createRegisterCarDto );
console.log(image);

  createRegisterCarDto.user = {
    "id": 26,
    "email": "abdulrehman1234@gmail.com",
    "iat": 1678851539,
    "exp": 1679851539
  }
    if (image) {
        const resultImg = await uploadToCloudinary(image.buffer, 'image') as string;
        return this.registerCarsService.create({ ...createRegisterCarDto, ...{ image: resultImg }});
      } 
    else {
      throw new BadRequestException('Please upload image');
    }
  }

  @Get()
  findAll(@Req()req) {
    const userId = req.user.id;
    return this.registerCarsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Req() req) {
    const userId = req.user.id;
    return this.registerCarsService.findOne(+id,userId);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateRegisterCarDto: UpdateRegisterCarDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      const logRes = (await uploadToCloudinary(
        image.buffer,
        'image',
      )) as string;
      return this.registerCarsService.update(+id, {
        ...updateRegisterCarDto,
        ...{ image: logRes },
      });
    } else {
      return this.registerCarsService.update(+id, updateRegisterCarDto);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerCarsService.remove(+id);
  }
}
