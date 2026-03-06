import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService, AuthService, RolesGuard],
})
export class AppModule {}



