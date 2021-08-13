import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AccessTokenPayload } from './dto/jwt-payload.interface';
import { JwtToken } from './dto/jwt-token.type';

@Injectable()
export class AccessTokenService {
  constructor(private readonly jwtService: JwtService) {}

  createAccessTokenForUser(user: User): JwtToken {
    const { id } = user;
    const payload: AccessTokenPayload = { id };

    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
