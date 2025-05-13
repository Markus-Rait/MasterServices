import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Cart[]> {
    return this.prisma.cart.findMany();
  }

  async findAllByUserID(userID: string): Promise<Cart[]> {
    return this.prisma.cart.findMany({ where: { userID } });
  }

  async findById(id: string): Promise<Cart | null> {
    return this.prisma.cart.findUnique({ where: { id } });
  }

  async create(cartData: Omit<Cart, 'id'>): Promise<Cart> {
    return this.prisma.cart.create({ data: cartData });
  }

  async update(
    id: string,
    updateData: Partial<Omit<Cart, 'id'>>,
  ): Promise<Cart> {
    return this.prisma.cart.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cart.delete({ where: { id } });
  }
}
