import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { MessageType } from 'src/common/graphql/dto/message.type';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserType } from './dto/user.type';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { ResolveCurrentUserInterceptor } from './interceptors/resolve-current-user.interceptor';
import { LoginArgs } from './services/login/dto/login.args';
import { LoginType } from './services/login/dto/login.type';
import { LoginService } from './services/login/login.service';
import { RegisterArgs } from './services/register/dto/register.args';
import { RegisterService } from './services/register/register.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly registerService: RegisterService, private readonly loginService: LoginService) {}

  @Mutation(() => MessageType)
  async register(@Args() args: RegisterArgs): Promise<MessageType> {
    await this.registerService.register(args);

    const message = 'Your account has been successfully registered! Now you can log in.';
    return { message };
  }

  @Mutation(() => LoginType)
  login(@Args() args: LoginArgs): Promise<LoginType> {
    return this.loginService.login(args);
  }

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(ResolveCurrentUserInterceptor)
  @Query(() => UserType)
  currentUser(@CurrentUser() user: User): UserType {
    return user;
  }
}
