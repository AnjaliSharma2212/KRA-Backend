import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )

  // Global Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor())

  // CORS
  const origins =
    configService.get<string>('ALLOWED_ORIGINS')?.split(',')

  app.enableCors({
    origin: origins,
    credentials: true,
  })

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('KRA API')
    .setDescription('API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('api-docs', app, document)

  // Graceful Shutdown
  app.enableShutdownHooks()

  const port = configService.get<number>('PORT') || 3000

  await app.listen(port)

  console.log(`Server running on ${port}`)
}

bootstrap()