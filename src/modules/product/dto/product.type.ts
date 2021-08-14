import { UserType } from '@auth/dto/user.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from '@prisma/client';

@ObjectType()
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
  readonly numOfUpvotes: number;

  @Field(() => UserType)
  readonly user?: UserType;
  readonly userId: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;
}
