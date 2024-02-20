import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserInput } from './dto/createUserDto';
import { hash, compare } from 'bcryptjs';
import { LoginUserDto } from 'src/auth/dto/login-user.input';

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
    return user;
  }

  async update(id: string, updateUserDto: CreateUserInput) {
    return this.userRepository.update(id, updateUserDto);
  }
  async delete(id: string) {
    return this.userRepository.delete(id);
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userRepository.getOneWithPassword({
      where: { email },
    });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: p, ...rest } = user;
    return rest;
  }

  async findOneByResetToken(token: string) {
    return this.userRepository.getOneWithPassword({
      where: {
        resetToken: token,
      },
    });
  }
  async findOneByEmailWithPassword(email: string) {
    return this.userRepository.getOneWithPassword({
      where: { email },
    });
  }
}
