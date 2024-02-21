import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.input';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import mailgun from 'mailgun.js';
import { ResetPasswordInput } from 'src/users/dto/reset-password.input';
import * as FormData from 'form-data';

@Injectable()
export class AuthService {
  private mailgun: any;
  private DOMAIN: string;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    const Mailgun = new mailgun(FormData);
    const Key = process.env.KEY_URL;
    this.DOMAIN = process.env.DOMAIN;
    this.mailgun = Mailgun.client({
      username: 'api',
      key: `${Key}`,
    });
  }

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
  async resetPassword(input: ResetPasswordInput) {
    const user = await this.usersService.findOneByResetToken(input.token);
    if (input.password !== input.confirmNewPassword) {
      throw new Error('New password and confirmation do not match.');
    }

    if (!user) {
      throw new HttpException(
        'Password reset token expired',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!user?.resetTokenExpiry || user?.resetTokenExpiry < new Date()) {
      throw new HttpException(
        'Password reset token expired',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hash(input.password, 0);
    return this.usersService.resetPassword(user._id, hashedPassword);
  }

  async forgetPassword(email: string) {
    const user = await this.usersService.findOneByEmailWithPassword(email);
    if (!user) {
      throw new Error('User not found');
    }
    const token = uuidv4();
    const PROCESS_URL = process.env.PROCESS_URL;
    const resetPasswordUrl = `${PROCESS_URL}/reset-password/${token}`;
    const data = {
      from: 'team.doc.esprit@outlook.com',
      to: email,
      subject: 'Reset your password',
      text: 'Reset password',
      html: `Click <a href="${resetPasswordUrl}">here</a> to reset your password`,
    };
    this.mailgun.messages
      .create(this.DOMAIN, data)
      .then((msg) => console.log(msg))
      .catch((err) => console.error(err));
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now
    await this.usersService.update(user._id, {
      resetToken: token,
      resetTokenExpiry,
    });
    return 'Password reset email sent';
  }
}
