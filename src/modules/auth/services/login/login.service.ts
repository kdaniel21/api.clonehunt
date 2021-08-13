import { PrismaService } from '@common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { LoginArgs } from './dto/login.args';
import { LoginType } from './dto/login.type';
import bcrypt from 'bcrypt';
import { LoginExceptions } from './login.exceptions';
import { AccessTokenService } from '../access-token/access-token.service';

@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaService, private readonly accessTokenService: AccessTokenService) {}

  async login(args: LoginArgs): Promise<LoginType> {
    const { username, password } = args;

    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new LoginExceptions.InvalidCredentials();

    const isPasswordCorrect = await this.doPasswordsMatch(password, user.password);
    if (!isPasswordCorrect) throw new LoginExceptions.InvalidCredentials();

    const accessToken = this.accessTokenService.createAccessTokenForUser(user);

    return { accessToken, user };
  }

  private async doPasswordsMatch(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
