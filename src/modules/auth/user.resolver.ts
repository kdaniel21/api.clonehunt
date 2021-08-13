import { Resolver } from '@nestjs/graphql';
import { UserType } from './dto/user.type';

@Resolver(() => UserType)
export class UserResolver {}
