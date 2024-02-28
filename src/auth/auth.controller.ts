import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { EmailUserInput } from 'src/users/dto/emailUserDto';
import { ResetPasswordInput } from 'src/users/dto/reset-password.input';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
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
  @Post('resetPassword')
  async resetPassword(@Body() input: ResetPasswordInput) {
    return this.authService.resetPassword(input);
  }
  @Post('forgetPassword')
  async forgetPassword(@Body() input: EmailUserInput) {
    return this.authService.forgetPassword(input.email);
  }
}
