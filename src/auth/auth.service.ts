import { Injectable, NotFoundException,MethodNotAllowedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { comparePassword } from 'src/helpers/generic-helper';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from 'src/constant/generic.constants';
import { VerificationCodeDto } from './dto/verification.code.dto';
import { verificationCodeEmailTemplate } from 'src/constants/email-templates';
import * as moment from 'moment';
import handlebars from 'handlebars';
import { EmailService } from './../shared/email.service';
import { UpdatePasswordDto } from './dto/update.password.dto';
const randomize = require('randomatic')
const _ = require('lodash')

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findUser(email);
   
    if (user) {
      const matchPassword = comparePassword(pass, user.password);
      if (matchPassword) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
  findUser(email: string) {
    return this.userRepository.findOne({
      select:['email','password','id'],
      where:{email}
    });
  }
  async login(payload: any) {
    return {
      access_token: this.jwtService.sign(payload, { secret: 'aroma' }),
    };
  }

  async forgetPassword(email: string) {
    const userData = await this.userRepository.findOne({
      where:{email}
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
    var expiryTime = moment().utc().add(2, 'hours').format();
    const htmlToSend = template(replacements);
    this.emailService.sendMail(email, htmlToSend, 'Confirm Email');
    await this.userRepository.update(userId, {
      verification_code: verCode,
      expiry_time: expiryTime,
    });
    return true;
  }
  async verificationCode(verificationCodeDto: VerificationCodeDto) {
    const userData = await this.userRepository.findOne({
      where: {email:verificationCodeDto.email}
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
      where: {email:updatepasswordDto.email}
    });
    const userId = userData.id;
    await this.userRepository.update(userId, {
      password: updatepasswordDto.password,
    });
    return true;
  }

}
