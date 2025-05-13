import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ServicesService, PrismaService],
  controllers: [ServicesController],
  // exports: [ServicesService],
})
export class ServicesModule {}
