import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  const corsOptions = getCorsOptions(configService);

  configureApp(app, corsOptions);

  await app.listen(port);
};

const configureApp = (app: INestApplication, corsOptions: CorsOptions) => {
  app.useGlobalPipes(getValidationPipe());
  app.use(cookieParser());
  app.enableCors(corsOptions);
};

const getValidationPipe = (): ValidationPipe =>
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  });

const getCorsOptions = (configService?: ConfigService): CorsOptions => ({
  origin:
    configService.get('APP_ENV') === 'development'
      ? true
      : configService.get('FRONTEND_URL'),
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
});

void bootstrap();
