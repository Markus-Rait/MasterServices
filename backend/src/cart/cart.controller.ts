import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '@prisma/client';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getAllCarts(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @Get()
  async getAllCartsByUserID(@Param('userID') userID: string): Promise<Cart[]> {
    return this.cartService.findAllByUserID(userID);
  }

  @Get(':id')
  async getCartById(@Param('id') id: string): Promise<Cart | null> {
    return this.cartService.findById(id);
  }

  @Post()
  async createCart(@Body() cartData: Omit<Cart, 'id'>): Promise<Cart> {
    return this.cartService.create(cartData);
  }

  @Put(':id')
  async updateCart(
    @Param('id') id: string,
    @Body() updateData: Partial<Omit<Cart, 'id'>>,
  ): Promise<Cart> {
    return this.cartService.update(id, updateData);
  }

  @Delete(':id')
  async deleteCart(@Param('id') id: string): Promise<void> {
    await this.cartService.delete(id);
  }
}
