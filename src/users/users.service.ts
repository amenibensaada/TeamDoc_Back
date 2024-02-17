import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserInput } from './dto/createUserDto';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }
  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async create(createUserDto: CreateUserInput) {
    const { password, confirmPassword, firstName, lastName, ...rest } =
      createUserDto;
    if (password !== confirmPassword) {
      throw new HttpException("Passwords don't match", HttpStatus.UNAUTHORIZED);
    }
    const hashedPassword = await hash(password, 0);
    const user = await this.userRepository.create({
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      ...rest,
    });
    console.log('userrrr', user);
    return user;
  }

  async update(id: string, updateUserDto: any) {
    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
