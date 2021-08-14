import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AccessTokenPayload } from '../services/access-token/dto/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req.cookies['access-token'],
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    } as StrategyOptions);
  }

  validate(payload: AccessTokenPayload & { iat: number; exp: number }): AccessTokenPayload {
    const { iat, exp, ...jwtPayload } = payload;
    return jwtPayload;
  }
}
