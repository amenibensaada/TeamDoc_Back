import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signup(input: CreateUserInput) {
    if (input.password !== input.confirmPassword) {
      throw new Error('Password and confirmation password do not match.');
    }
    return this.usersService.create(input);
  }
}
