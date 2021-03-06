import { UserType } from '@auth/dto/user.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from '@prisma/client';

@ObjectType('Product')
export class ProductType implements Product {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly url: string;

  @Field()
  readonly upvoteCount: number;

  @Field()
  readonly isUpvotedByCurrentUser?: boolean;

  @Field(() => UserType)
  readonly user?: UserType;
  readonly userId: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;
}
