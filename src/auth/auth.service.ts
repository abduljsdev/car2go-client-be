import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/helpers/generic-helper';
import { ERROR_MESSAGES } from 'src/utils/constants/generic.constants';
import { VerificationCodeDto } from './dto/verification.code.dto';
import { verificationCodeEmailTemplate } from 'src/utils/constants/email-templates';
import { EmailService } from './../shared/email.service';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { UserType } from 'src/user/enum/user.enum';
import { UserService } from 'src/user/user.service';
import handlebars from 'handlebars';
const randomize = require('randomatic');
import * as moment from 'moment';
const _ = require('lodash');

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
    role: UserType,
  ): Promise<any> {
    if (role == UserType.BUYER || role == UserType.SELLER) {
      const user = await this.userService.findLogin({
        email: email,
        role: role,
        isDeleted: false,
      });
      if (user) {
        const matchPassword = comparePassword(pass, user.password);
        if (matchPassword) {
          const { password, ...result } = user;
          return result;
        }
      }
      return null;
    } else {
      throw new BadRequestException('Role not empty or invalid');
    }
  }
  async login(payload: any) {
    return {
      access_token: this.jwtService.sign({ ...payload }),
    };
  }

  async forgetPassword(email: string) {
    const userData = await this.userService.filterOne({
      email: email,
      isDeleted: false,
    });
    if (!userData) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const verCode = randomize('0', 4);
    const template = handlebars.compile(verificationCodeEmailTemplate);
    const replacements = {
      verificationCode: verCode,
    };
    const userId = userData.id;
    var expiryTime = moment().utc().add(1, 'minutes').format();
    const htmlToSend = template(replacements);
    this.emailService.sendMail(email, htmlToSend, 'Confirm Email');
    await this.userService.updateWithOption(userId, {
      verification_code: verCode,
      expiry_time: expiryTime,
    });
    return { message: 'code is send successfully !' };
  }
  async verificationCode(verificationCodeDto: VerificationCodeDto) {
    const userData = await this.userService.filterOne({
      email: verificationCodeDto.email,
      isDeleted: false,
    });
    if (!userData) {
      throw new NotFoundException();
    }
    const verifyCode = _.isEqual(
      userData.verification_code,
      verificationCodeDto.verification_code,
    );

    const dateTimeCheck = moment(userData.expiry_time).isAfter(
      moment().utc().format(),
      'seconds',
    );
    if (!dateTimeCheck || !verifyCode) {
      throw new MethodNotAllowedException();
    }
    return true;
  }
  async updatePassword(updatepasswordDto: UpdatePasswordDto) {
    const userData = await this.userService.filterOne({
      email: updatepasswordDto.email,
      isDeleted: false,
    });
    const userId = userData.id;
    await this.userService.updateWithOption(userId, {
      password: updatepasswordDto.password,
    });
    return true;
  }
}
