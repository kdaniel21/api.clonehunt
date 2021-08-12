import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageType {
  @Field()
  readonly message: string;
}
