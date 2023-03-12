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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserType } from './enum/user.enum';
import { uploadToCloudinary } from 'src/helpers/db-helpers';
import {
  enCodePassword,
  GeneratePassword,
  sendMail,
} from 'src/helpers/generic-helper';
import { AuthGuard } from '@nestjs/passport';
import handlebars from 'handlebars';
import { FORGET_PASSWORD_EMAIL } from 'src/constants/email-templates';
import { ResetPassword } from './dto/reset-password.dto';
import { ERROR_MESSAGES } from 'src/constant/generic.constants';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}


  @Post('sign-up')
  async create(
    @Body() createUserDto: CreateUserDto,
  ) {
    const userData = await this.userService.findByEmail(createUserDto.email);
    if(userData){throw new ConflictException(ERROR_MESSAGES.USER_DUPLICATE  )}
    createUserDto.role = UserType.SELLER;
    const password = enCodePassword(createUserDto.password);
    return this.userService.create({...createUserDto,password})
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
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(+id, updateUserDto);
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
