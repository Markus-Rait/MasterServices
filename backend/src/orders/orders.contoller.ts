import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './orders.sevice';
import { Order } from '@prisma/client';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order | null> {
    return this.orderService.findById(id);
  }

  @Post()
  async createOrder(@Body() orderData: Omit<Order, 'id'>): Promise<Order> {
    return this.orderService.create(orderData);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateData: Partial<Omit<Order, 'id'>>,
  ): Promise<Order> {
    return this.orderService.update(id, updateData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<void> {
    await this.orderService.delete(id);
  }
}
