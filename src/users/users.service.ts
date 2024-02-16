import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }
  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async create(createUserDto: any): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string): Promise<User> {
    return this.userRepository.delete(id);
  }
}
