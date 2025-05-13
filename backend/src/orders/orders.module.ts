import { Module } from '@nestjs/common';
import { OrderController } from './orders.contoller';
import { OrderService } from './orders.sevice';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [OrderService, PrismaService],
  controllers: [OrderController],
})
export class OrderModule {}
