import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(select?: any): Promise<Omit<User, 'password'>[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return (await this.prisma.user.findMany(select)).map((user) => ({
      ...user,
      password: undefined,
    }));
  }

  async findById(id: string): Promise<Omit<User, 'id'> | null> {
    return this.prisma.user.findFirst({ where: { id: id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { email: email } });
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password, salt);
    return this.prisma.user.create({ data: { ...userData, password: hash } });
  }

  async update(
    id: string,
    updateData: Partial<Omit<User, 'id'>>,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id: id } });
  }
}
