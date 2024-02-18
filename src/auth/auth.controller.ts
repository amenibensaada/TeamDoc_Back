import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.input';
import { UserWithoutPassword } from 'src/users/users.repository';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signup')
  async create(@Body() createUserDto: CreateUserInput) {
    return this.usersService.create(createUserDto);
  }
  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<UserWithoutPassword> {
    const user = await this.usersService.login(loginDto);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
