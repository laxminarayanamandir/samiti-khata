import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { CustomValidationPipe } from './common/validation.pipe';
import { setupSwagger } from './common/swagger.config';
import { GlobalExceptionFilter } from './common/global-exception.filter';
import { ResponseTransformInterceptor } from './common/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser());

  // makes api routes start with /api
  app.setGlobalPrefix('api');

  // adds versioning of the api as /v2
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '2',
  });

  setupSwagger(app);

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => {
    console.log('Server is running on port', process.env.PORT ?? 3000);
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });
