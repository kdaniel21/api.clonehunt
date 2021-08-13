import { PaginationArgs } from '@common/graphql/dto/pagination.args';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Product } from '@prisma/client';
import { ProductType } from './dto/product.type';
import { CreateProductArgs } from './services/product/dto/create-product.args';
import { UpdateProductArgs } from './services/product/dto/update-product.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { ProductsType } from './services/product/dto/products.type';
import { GqlAuthGuard } from '@auth/guards/gql-auth.guard';
import { ProductService } from './services/product/product.service';
import { MessageType } from '@common/graphql/dto/message.type';
import { JwtPayload } from '@auth/decorators/jwt-payload.decorator';
import { AccessTokenPayload } from '@auth/services/access-token/dto/jwt-payload.interface';
import { UpvoteService } from './services/upvote/upvote.service';

@UseGuards(GqlAuthGuard)
@Resolver()
export class ProductsResolver {
  constructor(private readonly productService: ProductService, private readonly upvoteService: UpvoteService) {}

  @Mutation(() => ProductType)
  createProduct(@Args() args: CreateProductArgs, @JwtPayload() payload: AccessTokenPayload): Promise<ProductType> {
    const { id: userId } = payload;

    return this.productService.createProduct(args, userId);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args('id') productId: string,
    @Args() args: UpdateProductArgs,
    @JwtPayload() payload: AccessTokenPayload,
  ): Promise<Product> {
    const { id: userId } = payload;

    return this.productService.updateProduct(productId, args, userId);
  }

  @Mutation(() => MessageType)
  async deleteProduct(@Args('id') productId: string): Promise<MessageType> {
    await this.productService.deleteProduct(productId);

    const message = 'The selected product has been successfully removed!';
    return { message };
  }

  @Query(() => ProductType)
  product(@Args('id') productId: string): Promise<ProductType> {
    return this.productService.findProductById(productId);
  }

  @Query(() => ProductsType)
  products(@Args() args: PaginationArgs): Promise<ProductsType> {
    return findManyCursorConnection(
      (args) => this.productService.getProducts(args),
      () => this.productService.getTotalNumberOfProducts(),
      args,
      {
        encodeCursor: (cursor) => Buffer.from(JSON.stringify(cursor)).toString('base64'),
        decodeCursor: (cursor) => JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')),
      },
    );
  }

  @Mutation(() => ProductType)
  upvoteProduct(@Args('id') productId: string, @JwtPayload() payload: AccessTokenPayload): Promise<ProductType> {
    const { id: userId } = payload;

    return this.upvoteService.upvoteProduct({ productId, userId });
  }

  @Mutation(() => ProductType)
  downvoteProduct(@Args('id') productId: string, @JwtPayload() payload: AccessTokenPayload): Promise<ProductType> {
    const { id: userId } = payload;

    return this.upvoteService.downvoteProduct({ productId, userId });
  }
}