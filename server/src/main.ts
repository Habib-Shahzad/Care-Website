import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.static('build'));

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:3001', 'https://asherewecare.pk'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
