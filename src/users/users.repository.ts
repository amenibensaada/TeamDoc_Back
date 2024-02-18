import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { CreateUserInput } from './dto/createUserDto';
export type UserWithoutPassword = Omit<
  User,
  'password' | 'resetTokenExpiry' | 'resetToken' | 'verificationToken'
>;
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }

  async create(user: CreateUserInput): Promise<UserWithoutPassword> {
    const createdUser = new this.userModel(user);

    const savedUser = await createdUser.save();
    const result = savedUser.toObject();
    return this.exclude(result, ['password']);
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => this.exclude(user.toObject(), ['password']));
  }

  async findOne(id: string): Promise<UserWithoutPassword> {
    const user = await this.userModel.findById(id).exec();
    return this.exclude(user.toObject(), ['password']);
  }

  async update(id: string, updateUserDto: any): Promise<UserWithoutPassword> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    return this.exclude(updatedUser.toObject(), ['password']);
  }

  async delete(id: string): Promise<UserWithoutPassword> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    return this.exclude(deletedUser.toObject(), ['password']);
  }

  async getOneWithPassword(params: {
    where?: Partial<User>;
  }): Promise<User | null> {
    return this.userModel.findOne(params.where).exec();
  }
}
