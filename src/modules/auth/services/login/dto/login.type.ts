import { UserType } from '@auth/dto/user.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginType {
  @Field()
  readonly accessToken: string;

  @Field(() => UserType)
  readonly user: UserType;
}
