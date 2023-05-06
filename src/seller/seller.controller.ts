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
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserType } from 'src/user/enum/user.enum';
import { RoleGuard } from 'src/utils/guards/role.guard';
import {
  checkFileMineType,
  uploadToCloudinary,
} from 'src/utils/helpers/generic-helper';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { SellerService } from './seller.service';
var mime = require('mime-types');

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('add-car')
  @UseGuards(AuthGuard('jwt'))
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
  @Get('car-list')
  @UseGuards(AuthGuard('jwt'))
  findAllWithUser(@Req() req) {
    return this.sellerService.findAllWithUser(req.user.id);
  }

  @Get('car/:id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    const carData = await this.sellerService.findOne(+id, userId);
    if (!carData) {
      throw new NotFoundException();
    }
    return carData;
  }

  @Get('show/:id')
  @UseGuards(AuthGuard('jwt'))
  async show(@Param('id') id: string) {
    const carData = await this.sellerService.show(+id);
    if (!carData) {
      throw new NotFoundException();
    }
    return carData;
  }

  @Patch('update-car/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const userId = req.user.id;
    const carData = await this.sellerService.findOne(+id, userId);
    if (!carData) {
      throw new NotFoundException();
    }
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

  @Delete('car/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.sellerService.remove(+id);
  }

  @Get('filter-by-radius')
  findWithinRadius(
    @Query()
    queryParams: {
      latitude: string;
      longitude: string;
      radius: number;
    },
  ) {
    return this.sellerService.findWithinRadius(
      +queryParams.latitude,
      +queryParams.longitude,
      queryParams.radius,
    );
  }
}
