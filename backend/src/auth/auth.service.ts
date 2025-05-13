import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Gender, Role, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<User & { access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      if (await bcrypt.compare(user.password, hash)) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, email: user.email };
      return {
        ...user,
        password: '',
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async register(
    firstName: string,
    lastName: string,
    gender: Gender,
    email: string,
    phone: string,
    address: string,
    password: string,
    role: Role,
    avatar: string,
  ) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      return new BadRequestException('Login already in use');
    }
    return this.usersService.create({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      phone: phone,
      address: address,
      role: role,
      password: password,
      avatar: avatar,
    });
  }
}
