import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  MethodNotAllowedException,
  UnsupportedMediaTypeException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  checkFileMineType,
  uploadToCloudinary,
} from 'src/utils/helpers/generic-helper';
import { AccountService } from './account.service';
import { UpdateAccountDto } from './dto/update-account.dto';
var mime = require('mime-types');
import * as _ from 'lodash';
import { AuthGuard } from '@nestjs/passport';

@Controller('account')
@UseGuards(AuthGuard('jwt'))
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idCardFrontImage', maxCount: 1 },
      { name: 'idCardBackImage', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    @UploadedFiles()
    files: {
      length: number;
      idCardFrontImage?: Express.Multer.File[];
      idCardBackImage?: Express.Multer.File[];
    },
  ) {
    if (_.isEmpty(updateAccountDto)) {
      throw new MethodNotAllowedException();
    }
    if (files.idCardFrontImage) {
      const mineType = checkFileMineType(
        mime.lookup(files.idCardFrontImage[0].originalname),
      );
      if (!mineType) throw new UnsupportedMediaTypeException();
      const resultImg = (await uploadToCloudinary(
        files.idCardFrontImage[0].buffer,
        'image',
      )) as string;
      updateAccountDto.idCardFrontImage = resultImg;
    }

    if (files.idCardBackImage) {
      const mineType = checkFileMineType(
        mime.lookup(files.idCardBackImage[0].originalname),
      );
      if (!mineType) throw new UnsupportedMediaTypeException();
      const resultImg = (await uploadToCloudinary(
        files.idCardBackImage[0].buffer,
        'image',
      )) as string;
      updateAccountDto.idCardBackImage = resultImg;
    }
    return this.accountService.update(+id, updateAccountDto);
  }
  @Patch('verify/:email')
  verify(@Param('email') email: string, @Body() body: any) {
    return this.accountService.verify(1);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
