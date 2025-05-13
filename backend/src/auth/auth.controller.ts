/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return req.user;
  }

  @Post('register')
  async register(@Body() registerDto: Record<string, any>) {
    return this.authService.register(
      registerDto.firstName,
      registerDto.lastName,
      registerDto.gender,
      registerDto.email,
      registerDto.phone,
      registerDto.address,
      registerDto.password,
      registerDto.role,
      registerDto.avatar,
    );
  }
}
