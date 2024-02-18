import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/users.repository';
import { UsersController } from 'src/users/users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'teamDocDOC',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, UsersService, UserRepository],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
