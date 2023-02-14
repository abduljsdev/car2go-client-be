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
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import handlebars from 'handlebars';
import { FORGET_PASSWORD_EMAIL } from 'src/constants/email-templates';
import { ResetPassword } from './dto/reset-password.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createUserDto.role = UserType.SELLER;

    if (image) {
      if (
        createUserDto.role == 'SELLER' ||
        createUserDto.role == 'BUYER'
      ) {
        const resultImg = await uploadToCloudinary(image.buffer, 'image');
        const password = enCodePassword(createUserDto.password);
        return this.userService.create({
          ...createUserDto,
          password,
          ...{ image: resultImg },
        });
      } else {
        throw new BadRequestException('Please enter proper enum type');
      }
    } else {
      throw new BadRequestException('Please upload image');
    }
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
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      console.log('image update');

      const logRes = (await uploadToCloudinary(
        image.buffer,
        'image',
      )) as string;
      return this.userService.update(+id, {
        ...updateUserDto,
        ...{ image: logRes },
      });
    } else {
      console.log('image not update');
      return this.userService.update(+id, updateUserDto);
    }
  }

  @Post('reset-password')
  async ResetPassword(
    @Param('id') id: string,
    @Body() resetPassword: ResetPassword,
  ) {
    const user = await this.userService.findUser(resetPassword.email);
    if (user) {
      const newPassword = GeneratePassword('aA0', 6);
      const template = handlebars.compile(FORGET_PASSWORD_EMAIL);
      const replacements = {
        password: newPassword,
      };

      const htmlToSend = template(replacements);
      sendMail(user.email, htmlToSend, 'Your new password');
      const encryptedPassword = enCodePassword(newPassword);
      return this.userService.update(user.id, { password: encryptedPassword });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
