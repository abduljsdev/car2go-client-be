import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ConflictException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  comparePassword,
  enCodePassword,
} from 'src/utils/helpers/generic-helper';
import { ERROR_MESSAGES } from 'src/utils/constants/generic.constants';
import * as _ from 'lodash';
import { ChangePasswordDto } from './dto/change-password.dto';
var mime = require('mime-types');

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    const userData = await this.userService.filterByOptions({
      email: createUserDto.email,
    });
    if (userData) {
      throw new ConflictException(ERROR_MESSAGES.USER_DUPLICATE);
    }
    const password = enCodePassword(createUserDto.password);
    return this.userService.create({ ...createUserDto, password });
  }

  @Patch('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    const responseData = await this.userService.findPassword(
      changePasswordDto.email,
    );

    const matchPassword = comparePassword(
      changePasswordDto.oldPassword,
      responseData.password,
    );
    console.log(responseData.password, ',', matchPassword);

    if (!matchPassword) {
      throw new BadRequestException('Password does not match');
    }
    changePasswordDto.password = enCodePassword(changePasswordDto.password);
    return this.userService.changePassword(responseData.id, changePasswordDto);
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
