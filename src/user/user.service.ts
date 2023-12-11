import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Account } from 'src/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from 'src/auth/dto/register.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(registerUserDto: RegisterUserDto) {
    //create empty Account
    const account = new Account();
    const responseAccount = await this.accountRepository.save(account);
    registerUserDto.account = responseAccount;
    const user = this.userRepository.create({
      ...registerUserDto,
    });
    return this.userRepository.save(user);
  }

  changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    return this.userRepository.update(id, {
      password: changePasswordDto.password,
    });
  }
  findAll() {
    return this.userRepository.find({
      where: { isDeleted: false },
      relations: {
        account: true,
      },
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
      relations: {
        account: true,
      },
    });
  }

  filterOne(options: any) {
    return this.userRepository.findOne({
      where: options,
    });
  }

  filterAll(options: any) {
    return this.userRepository.find({
      where: options,
    });
  }

  findLogin(options: any) {
    return this.userRepository.findOne({
      where: options,
      select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
      relations: {
        account: true,
      },
    });
  }

  findPassword(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
        isDeleted: false,
      },
      select: ['password'],
    });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
    });
  }
  updateWithOption(id: number, updateUserDto: any) {
    return this.userRepository.update(id, updateUserDto);
  }
  remove(id: number) {
    return this.userRepository.update(id, { isDeleted: true });
  }
}
