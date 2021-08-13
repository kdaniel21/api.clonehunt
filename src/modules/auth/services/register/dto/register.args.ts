import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RegisterArgs {
  @Field()
  readonly username: string;

  @Field()
  readonly password: string;

  @Field({ nullable: true })
  readonly email?: string;
}
