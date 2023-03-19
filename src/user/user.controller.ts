import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Req,
  ConflictException,
  MethodNotAllowedException,
  UploadedFiles,
  UnsupportedMediaTypeException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { UserType } from './enum/user.enum';
import { uploadToCloudinary } from 'src/utils/helpers/db-helpers';
import {
  checkFileMineType,
  comparePassword,
  enCodePassword,
  GeneratePassword,
  sendMail,
} from 'src/utils/helpers/generic-helper';
import { AuthGuard } from '@nestjs/passport';
import handlebars from 'handlebars';
import { FORGET_PASSWORD_EMAIL } from 'src/utils/constants/email-templates';
import { ResetPassword } from './dto/reset-password.dto';
import { ERROR_MESSAGES } from 'src/utils/constants/generic.constants';
import { UpdateAccountDto } from './dto/update-account.dto';
import * as _ from 'lodash';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateAccountDto } from './dto/create-account.dto';
var mime = require('mime-types');

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    const userData = await this.userService.findByEmail(createUserDto.email);
    if (userData) {
      throw new ConflictException(ERROR_MESSAGES.USER_DUPLICATE);
    }
    createUserDto.role = UserType.SELLER;
    const password = enCodePassword(createUserDto.password);
    return this.userService.create({ ...createUserDto, password });
  }

  @Post('create-account')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idCardFrontImage', maxCount: 1 },
      { name: 'idCardBackImage', maxCount: 1 },
    ]),
  )
  async createAccount(
    @Param('id') id: string,
    @Body() createAccountDto: CreateAccountDto,
    @UploadedFiles()
    files: {
      length: number;
      idCardFrontImage?: Express.Multer.File[];
      idCardBackImage?: Express.Multer.File[];
    },
  ) {
    if (_.isEmpty(createAccountDto)) {
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
      createAccountDto.idCardFrontImage = resultImg;
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
      createAccountDto.idCardBackImage = resultImg;
    }
    return createAccountDto;
  }

  @Patch('update-account')
  async updateAccount(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    if (_.isEmpty(updateAccountDto)) {
      throw new MethodNotAllowedException();
    }
    return updateAccountDto;
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  updatePassword(@Body() changePasswordDto: ChangePasswordDto) {
    // const matchPassword = comparePassword(
    //   '1223',
    //   changePasswordDto.oldPassword,
    // );
    return true;
  }

  @Post('verify-account/:email')
  verifyAccount(@Param('email') email: string, @Body() body: any) {
    // const matchPassword = comparePassword(
    //   '1223',
    //   changePasswordDto.oldPassword,
    // );
    return true;
  }

  @Get('all-accounts')
  findAllAccounts() {
    return true;
  }

  @Get('one-account/:id')
  findOneAccount(@Param('id') id: string) {
    return true;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
