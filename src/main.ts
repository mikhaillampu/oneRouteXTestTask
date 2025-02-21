import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenv } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig =  new DocumentBuilder()
    .setTitle('OneRouteX test API')
    .setDescription('This API is implementation of the test task for hiring (or not) Michael Lampu')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Bearer <TOKEN>',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        type: 'http',
      },
      'access-token')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/doc', app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      schemaExpansion: 'none',
      defaultModelsExpandDepth: 0,
      defaultModelExpandDepth: 0,
      defaultModelRendering: 'example',
      displayRequestDuration: true,
      filter: true,
      tagsSorter: 'alpha',
      // showExtensions: true,
      // showCommonExtensions: true,
      syntaxHighlight: true,
      'syntaxHighlight.theme': 'idea',
      tryItOutEnabled: true,
      // requestSnippetsEnabled: true,
      persistAuthorization: true
    }
  });

  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
