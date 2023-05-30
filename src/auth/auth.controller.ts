import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { ERROR_MESSAGES } from 'src/utils/constants/generic.constants';
import { enCodePassword } from 'src/utils/helpers/generic-helper';
import { AuthService } from './auth.service';
import { ForgetPasswordDto } from './dto/forget.password.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { VerificationCodeDto } from './dto/verification.code.dto';
import { EmailVerificationDto } from './dto/email.verification.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async create(@Body() registerUserDto: RegisterUserDto) {
    const userData = await this.userService.filterOne({
      email: registerUserDto.email,
      role: registerUserDto.role,
      isDeleted: false,
    });

    if (userData) {
      throw new ConflictException(ERROR_MESSAGES.USER_DUPLICATE);
    }
    registerUserDto.password = enCodePassword(registerUserDto.password);
    return this.userService.create(registerUserDto);
  }
  @Post('forget-password')
  @HttpCode(HttpStatus.OK)
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto, @Req() req) {
    return this.authService.forgetPassword(forgetPasswordDto.email);
  }
  @Post('verification-code')
  @HttpCode(HttpStatus.OK)
  verificationCode(@Body() verificationCodeDto: VerificationCodeDto) {
    return this.authService.verificationCode(verificationCodeDto);
  }
  @Post('update-password')
  updatePassword(@Body() updatepasswordDto: UpdatePasswordDto) {
    updatepasswordDto.password = enCodePassword(updatepasswordDto.password);

    return this.authService.updatePassword(updatepasswordDto);
  }

  @Post('email-verification')
  @HttpCode(HttpStatus.OK)
  async verificationEmail(@Body() emailVerificationDto: EmailVerificationDto) {
    const userFound = await this.userService.filterOne({
      email: emailVerificationDto.email,
    });
    if (userFound) {
      this.authService.sendVerificationLink(userFound.email);
      return { message: 'Email sent' };
    } else {
      throw new NotFoundException();
    }
  }

  @Get('confirm-email')
  @Render('email-verification')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Query() query: { token: string }) {
    const token = query.token;
    const decodedToken = await this.authService.decodeConfirmationToken(token);

    if (!decodedToken.status) {
      return { message: decodedToken.message };
    }
    console.log(decodedToken.email);

    const foundUser = await this.userService.filterOne({
      email: decodedToken.email,
    });

    if (foundUser.emailVerified) {
      return { message: 'Email is already verified' };
    } else {
      await this.userService.updateWithOption(foundUser.id, {
        emailVerified: true,
      });
      return { message: 'Email is verified' };
    }
  }
}
