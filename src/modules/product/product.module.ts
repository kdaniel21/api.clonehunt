import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductsResolver } from './products.resolver';
import { ProductService } from './services/product/product.service';
import { UpvoteService } from './services/upvote/upvote.service';

const services = [ProductService, UpvoteService];

@Module({
  imports: [CommonModule],
  exports: [...services],
  providers: [...services, ProductsResolver, ProductResolver],
})
export class ProductModule {}
