import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Project Management')
      .setDescription('API for project management')
      .addBearerAuth()
      .setVersion('1.0.0')
      .build(),
  );
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
}

bootstrap();
