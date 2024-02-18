import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.input';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('signup')
  async create(@Body() createUserDto: CreateUserInput) {
    return this.usersService.create(createUserDto);
  }
  @Post('login')
  async login(@Body() args: LoginUserDto) {
    const { email, password } = args;
    const user = await this.authService.login({ email, password });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
