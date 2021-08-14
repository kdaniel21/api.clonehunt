import { GraphqlContext } from '@common/graphql/dto/graphql-context.interface';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
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
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
    private readonly configService: ConfigService,
  ) {}

  @Mutation(() => MessageType)
  async register(@Args() args: RegisterArgs): Promise<MessageType> {
    await this.registerService.register(args);

    const message = 'Your account has been successfully registered! Now you can log in.';
    return { message };
  }

  @Mutation(() => LoginType)
  async login(@Args() args: LoginArgs, @Context() context: GraphqlContext): Promise<LoginType> {
    const result = await this.loginService.login(args);

    const isProduction = this.configService.get<string>('NODE_ENV') === 'PRODUCTION';
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      secure: isProduction,
      sameSite: 'none' as const,
    };
    context.res.cookie('access-token', result.accessToken, cookieOptions);

    return { ...result, accessToken: `Bearer ${result.accessToken}` };
  }

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(ResolveCurrentUserInterceptor)
  @Query(() => UserType)
  currentUser(@CurrentUser() user: User): UserType {
    return user;
  }
}
