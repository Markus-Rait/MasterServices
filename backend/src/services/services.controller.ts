import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from '@prisma/client';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getAllServices(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  async getServiceById(@Param('id') id: string): Promise<Service | null> {
    return this.servicesService.findById(id);
  }

  @Post()
  async createService(
    @Body() serviceData: Omit<Service, 'id'>,
  ): Promise<Service> {
    return this.servicesService.create(serviceData);
  }

  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() updateData: Partial<Omit<Service, 'id'>>,
  ): Promise<Service> {
    return this.servicesService.update(id, updateData);
  }

  @Delete(':id')
  async deleteService(@Param('id') id: string): Promise<void> {
    await this.servicesService.delete(id);
  }
}
