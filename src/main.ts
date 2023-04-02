import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cloudinary = require('cloudinary');
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './utils/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());
  const configService = app.get<ConfigService>(ConfigService);
  cloudinary.config({
    cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
    api_key: configService.get('CLOUDINARY_API_KEY'),
    api_secret: configService.get('CLOUDINARY_API_SECRET'),
  });

  await app.listen(configService.get('ports.main'));
}
bootstrap();
