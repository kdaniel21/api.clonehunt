import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './common/graphql/graphql.module';

@Module({
  imports: [GraphqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
