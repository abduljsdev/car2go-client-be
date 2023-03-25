import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Req,
  BadRequestException,
  UploadedFile,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  checkFileMineType,
  uploadToCloudinary,
} from 'src/utils/helpers/generic-helper';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { SellerService } from './seller.service';
var mime = require('mime-types');

@Controller('seller')
@UseGuards(AuthGuard('jwt'))
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('add-car')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCarDto: CreateCarDto,
    @Req() req,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createCarDto.user = req.user;
    if (image) {
      const mineType = checkFileMineType(mime.lookup(image.originalname));
      if (!mineType) throw new UnsupportedMediaTypeException();
      const resultImg = (await uploadToCloudinary(
        image.buffer,
        'image',
      )) as string;
      return this.sellerService.create({
        ...createCarDto,
        ...{ image: resultImg },
      });
    } else {
      throw new BadRequestException('Please upload image');
    }
  }

  @Get('cars')
  findAll() {
    return this.sellerService.findAll();
  }

  @Get('car/:id')
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.sellerService.findOne(+id, userId);
  }

  @Patch('update-car/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      const logRes = (await uploadToCloudinary(
        image.buffer,
        'image',
      )) as string;
      return this.sellerService.update(+id, {
        ...updateCarDto,
        ...{ image: logRes },
      });
    } else {
      return this.sellerService.update(+id, updateCarDto);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerService.remove(+id);
  }
}
