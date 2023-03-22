import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { SharedModule } from './shared/shared.module';
import { SellerModule } from './seller/seller.module';
import { Account } from './user/entities/account.entity';
import { BookingModule } from './booking/booking.module';
import { Car } from './seller/entities/car.entity';
import { Booking } from './booking/entities/booking.entity';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
          // envFilePath: '.prod.env',
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE_NAME'),
        entities: [User, Account, Car, Booking],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    UserModule,
    SellerModule,
    BookingModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
