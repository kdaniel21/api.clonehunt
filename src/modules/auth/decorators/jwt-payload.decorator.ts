import { AccessTokenPayload as JwtPayloadType } from '@auth/services/access-token/dto/jwt-payload.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const JwtPayload = createParamDecorator((data: unknown, context: ExecutionContext): JwtPayloadType => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user as JwtPayloadType;
});
