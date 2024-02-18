import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(input: CreateUserInput) {
    if (input.password !== input.confirmPassword) {
      throw new Error('Password and confirmation password do not match.');
    }
    return this.usersService.create(input);
  }
  private _createToken(
    user: { email: string; role: string[]; id: string },
    expiresIn = '1d',
  ) {
    const token = this.jwtService.sign(user, {
      expiresIn,
    });
    return {
      expiresIn,
      token,
    };
  }
  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.login(loginUserDto);
    const token = this._createToken({
      id: user._id,
      email: user.email,
      role: user.accountType,
    });
    return {
      token,
      data: user,
    };
  }
}
