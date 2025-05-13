import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { Service } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  async findById(id: string): Promise<Service | null> {
    return this.prisma.service.findUnique({ where: { id: id } });
  }

  async create(serviceData: Omit<Service, 'id'>): Promise<Service> {
    return this.prisma.service.create({ data: serviceData });
  }

  async update(
    id: string,
    updateData: Partial<Omit<Service, 'id'>>,
  ): Promise<Service> {
    return this.prisma.service.update({
      where: { id: id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.service.delete({ where: { id: id } });
  }
}
