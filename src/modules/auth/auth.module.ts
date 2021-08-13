import { CommonModule } from '@common/common.module';
import { ConfigModule } from '@common/config/config.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { AccessTokenService } from './services/access-token/access-token.service';
import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserResolver } from './user.resolver';

const jwtFactory = async (configService: ConfigService): Promise<JwtModuleOptions> => ({
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
});

const services = [AccessTokenService, LoginService, RegisterService];

@Module({
  imports: [
    CommonModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: jwtFactory,
      inject: [ConfigService],
    }),
  ],
  exports: [...services],
  providers: [...services, AuthResolver, JwtStrategy, UserResolver],
})
export class AuthModule {}
