import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerBuilder } from './config/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      origin: true,
      preflightContinue: false,
    },
  });

  const config = app.get<ConfigService>(ConfigService);

  app.use(helmet());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe());

  SwaggerBuilder.build(app);

  const PORT = config.get<number>('port');
  await app.listen(PORT);
  Logger.log(`App running in port ${PORT}`, 'bootstrap');
}
bootstrap();
