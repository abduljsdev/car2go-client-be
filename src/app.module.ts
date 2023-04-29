import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { SellerModule } from './seller/seller.module';
import { BookingModule } from './booking/booking.module';
import { AccountModule } from './account/account.module';
import { PaymentModule } from './payment/payment.module';
import { BlogModule } from './blog/blog.module';
import { DriverModule } from './driver/driver.module';
import configuration from './utils/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.databaseName'),
        entities: ['dist/**/*.entity{.ts,.js}'],
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
    PaymentModule,
    BlogModule,
    DriverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
