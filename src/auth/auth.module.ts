import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/users.repository';
import { UsersController } from 'src/users/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: 'teamDocDOC',
        signOptions: { expiresIn: '1d' }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, UsersService, UserRepository, JwtStrategy, ConfigService],
  controllers: [AuthController, UsersController]
})
export class AuthModule {}
