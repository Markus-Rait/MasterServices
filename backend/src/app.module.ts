import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { UploadController } from './upload/upload.controller';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CartModule,
    ServicesModule,
    ServicesModule,
  ],
  controllers: [UploadController],
})
export class AppModule {}
