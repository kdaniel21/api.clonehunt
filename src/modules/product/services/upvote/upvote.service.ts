import { PrismaService } from '@common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { ProductService } from '../product/product.service';

type VoteArgs = { productId: string; userId: string };

@Injectable()
export class UpvoteService {
  constructor(private readonly prisma: PrismaService, private readonly productService: ProductService) {}

  async upvoteProduct({ productId, userId }: VoteArgs): Promise<Product> {
    const product = await this.productService.findProductById(productId);

    const isAlreadyUpvoted = await this.isProductUpvotedByUser({ userId, productId });
    if (isAlreadyUpvoted) return product;

    const createOperation = this.prisma.upvote.create({ data: { productId, userId } });
    const updateCountOperation = this.updateProductUpvoteCount(productId, product.upvoteCount + 1);
    const [updatedProduct] = await this.prisma.$transaction([updateCountOperation, createOperation]);

    return updatedProduct;
  }

  async removeProductUpvote({ productId, userId }: VoteArgs): Promise<Product> {
    const product = await this.productService.findProductById(productId);

    const isAlreadyUpvoted = await this.isProductUpvotedByUser({ productId, userId });
    if (!isAlreadyUpvoted) return product;

    const deleteOperation = this.prisma.upvote.delete({ where: { userId_productId: { userId, productId } } });
    const updateCountOperation = this.updateProductUpvoteCount(productId, product.upvoteCount - 1);
    const [updatedProduct] = await this.prisma.$transaction([updateCountOperation, deleteOperation]);

    return updatedProduct;
  }

  async isProductUpvotedByUser(args: VoteArgs): Promise<boolean> {
    const existingVote = await this.prisma.upvote.findUnique({ where: { userId_productId: args } });

    return !!existingVote;
  }

  private updateProductUpvoteCount(productId: string, newUpvoteCount: number): Prisma.Prisma__ProductClient<Product> {
    return this.prisma.product.update({
      where: { id: productId },
      data: { upvoteCount: newUpvoteCount },
    });
  }
}
