import { UserType } from '@auth/dto/user.type';
import { PrismaService } from '@common/services/prisma.service';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from '@prisma/client';
import { ProductType } from './dto/product.type';
import { UpvoteService } from './services/upvote/upvote.service';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private readonly prisma: PrismaService, private readonly upvoteService: UpvoteService) {}

  @ResolveField(() => UserType)
  async user(@Parent() product: ProductType): Promise<UserType> {
    return this.prisma.user.findUnique({ where: { id: product.userId } });
  }

  @ResolveField(() => Boolean)
  async isUpvotedByCurrentUser(@Parent() product: Product): Promise<boolean> {
    const { userId, id: productId } = product;
    return this.upvoteService.isProductUpvotedByUser({ productId, userId });
  }
}
