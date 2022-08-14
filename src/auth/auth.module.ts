import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './authGuard/auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './authGuard/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authGuard/auth.guard';
require('dotenv').config()

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRESIN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
