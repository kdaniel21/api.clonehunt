import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [CommonModule, AuthModule, ProductModule],
})
export class AppModule {}
