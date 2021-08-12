import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaService } from './services/prisma.service';

const modules = [GraphqlModule];

@Module({
  imports: [...modules],
  exports: [...modules, PrismaService],
  providers: [PrismaService],
})
export class CommonModule {}
