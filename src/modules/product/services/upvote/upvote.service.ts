import { PrismaService } from '@common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Product, VoteType } from '@prisma/client';
import { ProductExceptions } from '../../product.exceptions';

type VoteArgs = { productId: string; userId: string };

@Injectable()
export class UpvoteService {
  constructor(private readonly prisma: PrismaService) {}

  upvoteProduct(args: VoteArgs): Promise<Product> {
    return this.voteForProduct(args, VoteType.Upvote);
  }

  async downvoteProduct(args: VoteArgs): Promise<Product> {
    return this.voteForProduct(args, VoteType.Downvote);
  }

  private async voteForProduct({ productId, userId }: VoteArgs, voteType: VoteType): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new ProductExceptions.ProductNotFound();

    const existingVote = await this.prisma.vote.findUnique({ where: { userId_productId: { userId, productId } } });
    const hasAlreadyVoted = !!existingVote;

    const isVotingForSame = hasAlreadyVoted && existingVote.type === voteType;
    if (isVotingForSame) return product;

    const voteOperation = this.prisma.vote.upsert({
      where: { userId_productId: { productId, userId } },
      create: { productId, userId, type: voteType },
      update: { type: voteType },
    });

    let upvotesToAdd = voteType === 'Upvote' ? 1 : -1;

    // numOfUpvotes already includes the original vote, that needs to be removed as well
    if (hasAlreadyVoted) upvotesToAdd *= 2;

    const updateNumOfUpvotesOperation = this.prisma.product.update({
      where: { id: productId },
      data: { numOfUpvotes: product.numOfUpvotes + upvotesToAdd },
    });

    await this.prisma.$transaction([voteOperation, updateNumOfUpvotesOperation]);

    return { ...product, numOfUpvotes: product.numOfUpvotes + upvotesToAdd };
  }
}
