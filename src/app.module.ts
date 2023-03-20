import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { RegisterCarsModule } from './register-cars/register-cars.module';
import { RegisterCar } from './register-cars/entities/register-car.entity';
import { RentedCarsModule } from './rented-cars/rented-cars.module';
import { RentedCar } from './rented-cars/entities/rented-car.entity';
import { SharedModule } from './shared/shared.module';
import { SellerModule } from './seller/seller.module';
import { BuyerModule } from './buyer/buyer.module';
import { Account } from './user/entities/account.entity';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.local.env',
          // envFilePath: '.prod.env',
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Account, RegisterCar, RentedCar],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    UserModule,
    RegisterCarsModule,
    RentedCarsModule,
    SellerModule,
    BuyerModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
