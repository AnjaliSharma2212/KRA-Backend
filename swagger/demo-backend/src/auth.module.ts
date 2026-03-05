import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'


JwtModule.registerAsync({
  inject: [ConfigService],

  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: '1h' },
  }),
})