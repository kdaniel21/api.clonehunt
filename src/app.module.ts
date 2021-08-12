import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthResolver } from './modules/auth/auth.resolver';

const services = [];

@Module({
  imports: [CommonModule],
  providers: [AuthResolver],
})
export class AppModule {}
