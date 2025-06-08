import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvConfiguration } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );

  const port = process.env.PORT!;
  app.listen(port);

  // await app.listen(process.env.PORT);
  // await app.listen(3000);
  // await app.listen(process.env.PORT);
  // console.log(`App runnig on port ${process.env.PORT}`)
}
bootstrap();
