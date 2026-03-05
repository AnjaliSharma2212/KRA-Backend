import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
@Module({
  imports: [userModule, ConfigModule.forRoot({
    isGlobal:true,
    validationSchema,
    load: [configuration],

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
