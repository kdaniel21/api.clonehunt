import { Resolver, Query } from '@nestjs/graphql';
import { MessageType } from 'src/common/graphql/dto/message.type';

@Resolver()
export class AuthResolver {
  @Query(() => MessageType)
  foo(): MessageType {
    return { message: 'bar' };
  }
}
