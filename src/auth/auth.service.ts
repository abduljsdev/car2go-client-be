import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { comparePassword } from 'src/utils/helpers/generic-helper';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from 'src/utils/constants/generic.constants';
import { VerificationCodeDto } from './dto/verification.code.dto';
import { verificationCodeEmailTemplate } from 'src/utils/constants/email-templates';
import * as moment from 'moment';
import handlebars from 'handlebars';
import { EmailService } from './../shared/email.service';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { UserType } from 'src/user/enum/user.enum';
const randomize = require('randomatic');
const _ = require('lodash');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
    role: UserType,
  ): Promise<any> {
    if (role == UserType.BUYER || role == UserType.SELLER) {
      const user = await this.findUser(email, role);

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
  findUser(email: string, role: any) {
    return this.userRepository.findOne({
      select: ['firstName', 'lastName', 'email', 'password', 'role'],
      where: { email, role },
    });
  }
  async login(payload: any) {
    return {
      access_token: this.jwtService.sign(payload, { secret: 'aroma' }),
    };
  }

  async forgetPassword(email: string) {
    const userData = await this.userRepository.findOne({
      where: { email },
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
    await this.userRepository.update(userId, {
      verification_code: verCode,
      expiry_time: expiryTime,
    });
    return { message: 'code is send successfully !' };
  }
  async verificationCode(verificationCodeDto: VerificationCodeDto) {
    const userData = await this.userRepository.findOne({
      where: { email: verificationCodeDto.email },
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
    const userData = await this.userRepository.findOne({
      where: { email: updatepasswordDto.email },
    });
    const userId = userData.id;
    await this.userRepository.update(userId, {
      password: updatepasswordDto.password,
    });
    return true;
  }
}
