import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginArgs {
  @Field()
  readonly username: string;

  @Field()
  readonly password: string;
}
