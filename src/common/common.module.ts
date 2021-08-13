import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaService } from './services/prisma.service';
import { ConfigModule } from './config/config.module';

const modules = [GraphqlModule, ConfigModule];

@Module({
  imports: [...modules],
  exports: [...modules, PrismaService],
  providers: [PrismaService],
})
export class CommonModule {}
