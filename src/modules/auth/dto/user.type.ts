import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType()
export class UserType implements Partial<User> {
  @Field()
  readonly id: string;

  @Field()
  readonly username: string;

  @Field({ nullable: true })
  readonly email?: string;

  // @Field(() => [ProductType])
  // readonly products: ProductType[]

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;
}
