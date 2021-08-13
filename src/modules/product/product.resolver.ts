import { UserType } from '@auth/dto/user.type';
import { PrismaService } from '@common/services/prisma.service';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductType } from './dto/product.type';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => UserType)
  async user(@Parent() product: ProductType): Promise<UserType> {
    return this.prisma.user.findUnique({ where: { id: product.userId } });
  }
}
