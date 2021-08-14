import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType('User')
export class UserType implements Partial<User> {
  @Field(() => ID)
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
