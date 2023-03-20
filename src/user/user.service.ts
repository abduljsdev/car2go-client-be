import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //create empty Account
    const account = new Account();
    const responseAccount = await this.accountRepository.save(account);
    createUserDto.account = responseAccount;
    const user = this.userRepository.create({
      ...createUserDto,
    });
    return this.userRepository.save(user);
  }
  createAccount(id: number, createAccountDto: CreateAccountDto) {
    return this.accountRepository.update(id, createAccountDto);
  }
  updateAccount(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update(id, updateAccountDto);
  }
  verifyAccount(id: number) {
    return this.accountRepository.update(id, { verify: true });
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
      relations: { account: true },
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  findUser(email: string) {
    return this.userRepository.findOneBy({
      email,
    });
  }
  findAllAccount() {
    return this.userRepository.find();
  }

  findOneAccount(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  findPassword(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
      select: ['id', 'password'],
    });
  }
  update(id: number, updateUserDto: any) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.update(id, { isDeleted: true });
  }
}
