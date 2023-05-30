import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
  Post,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  comparePassword,
  enCodePassword,
} from 'src/utils/helpers/generic-helper';
import * as _ from 'lodash';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { ContactUsDto } from './dto/contact-us.dto';
import handlebars from 'handlebars';
import { contactUsTemplate } from 'src/utils/constants/email-templates';
import { EmailService } from 'src/shared/email.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Patch('change-password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const responseData = await this.userService.findPassword(
      changePasswordDto.email,
    );

    const matchPassword = comparePassword(
      changePasswordDto.oldPassword,
      responseData.password,
    );

    if (!matchPassword) {
      throw new BadRequestException('Password does not match');
    }
    changePasswordDto.password = enCodePassword(changePasswordDto.password);
    return this.userService.changePassword(+id, changePasswordDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  async findMe(@Req() req: any) {
    return await this.userService.findOne(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userData = await this.userService.findOne(+id);
    if (!userData) {
      throw new NotFoundException();
    }
    return userData;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userData = await this.userService.findOne(+id);
    if (!userData) {
      throw new NotFoundException();
    }
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userData = await this.userService.findOne(+id);
    if (!userData) {
      throw new NotFoundException();
    }
    return this.userService.remove(+id);
  }

  @Post('contact-us')
  async contactUs(@Body() contactUsDto: ContactUsDto) {
    const contactUsData = await this.userService.contactUs(contactUsDto);
    if (!contactUsData) {
      throw new InternalServerErrorException();
    }
    const replacements = {
      name: contactUsDto.name,
      message: contactUsDto.message,
    };
    const template = handlebars.compile(contactUsTemplate);
    const htmlToSend = template(replacements);
    this.emailService.sendMail(contactUsDto.email, htmlToSend, 'Confirm Email');
    return true;
  }
}
