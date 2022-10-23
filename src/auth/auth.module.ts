import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './controller/auth.controller';
import { TokenModule } from '../token/token.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    UsersModule,
    TokenModule,
    EmailModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthController],
  exports: [AuthService],
})
export class AuthModule {}
