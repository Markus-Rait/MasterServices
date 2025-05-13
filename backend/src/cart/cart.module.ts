import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CartService, PrismaService],
  controllers: [CartController],
})
export class CartModule {}
