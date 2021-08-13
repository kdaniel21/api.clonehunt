import { PrismaService } from '@common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { RegisterArgs } from './dto/register.args';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { RegisterExceptions } from './register.exceptions';
import { User } from '@prisma/client';

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) {}

  async register(args: RegisterArgs): Promise<User> {
    const { username, password, email } = args;

    const userWithSameUsername = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    const isUsernameReserved = !!userWithSameUsername;
    if (isUsernameReserved) throw new RegisterExceptions.UsernameAlreadyReserved();

    const hashedPassword = await this.hashPassword(password);

    const createdUser = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return createdUser;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = +this.configService.get('BCRYPT_SALT_ROUNDS');

    return bcrypt.hash(password, saltRounds);
  }
}
