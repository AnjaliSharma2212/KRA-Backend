import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger configuration
  const config = new DocumentBuilder()
  .setTitle('User API')
  .setDescription('API documentation for user module')
  .setVersion('1.0')
  .addBearerAuth()
  .build()
  
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api-docs', app, document)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
