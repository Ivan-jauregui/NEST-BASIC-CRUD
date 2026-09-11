import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Elimina del body aquellos campos que no estan en el dto
      forbidNonWhitelisted: true, // Tira error si mandas campos de mas
      transform: true // Convierte los tipos automaticamente
    })
  )

  const config = new DocumentBuilder()
  .setTitle('Distrisuper API')
  .setDescription('Documentación pratica backend')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('products',app,document)


  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
