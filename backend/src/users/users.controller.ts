import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Omit<User, 'id'> | null> {
    return this.usersService.findById(id);
  }

  @Post()
  async createUser(@Body() userData: Omit<User, 'id'>): Promise<User> {
    return this.usersService.create(userData);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<Omit<User, 'id'>>,
  ): Promise<User> {
    return this.usersService.update(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
