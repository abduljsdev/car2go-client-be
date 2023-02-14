import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { comparePassword } from 'src/helpers/generic-helper';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    return this.userRepository.findOneBy({
      email,
    });
  }
  async login(payload: any) {
    return {
      access_token: this.jwtService.sign(payload, { secret: 'aroma' }),
    };
  }
}
