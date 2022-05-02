import { Module, Global, Req, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt.guard';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AppModule } from 'src/app.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => AppModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule,],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '12h' }
      })
    }),
  ],
  providers: [ AuthService, JwtStrategy, JwtAuthGuard],
  exports: [ AuthService, JwtStrategy, JwtAuthGuard],
})


export class AuthModule { }