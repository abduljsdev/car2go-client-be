import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
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

  filterByOptions(options: any) {
    return this.userRepository.findOne({
      where: options,
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
