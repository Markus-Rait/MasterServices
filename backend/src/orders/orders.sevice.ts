import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async findById(id: string): Promise<Order | null> {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async create(orderData: Omit<Order, 'id'>): Promise<Order> {
    return this.prisma.order.create({ data: orderData });
  }

  async update(
    id: string,
    updateData: Partial<Omit<Order, 'id'>>,
  ): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }
}
