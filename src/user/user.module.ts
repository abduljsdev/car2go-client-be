import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Account } from 'src/account/entities/account.entity';
import { ContactUs } from './entities/contact.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ContactUs, User, Account]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
