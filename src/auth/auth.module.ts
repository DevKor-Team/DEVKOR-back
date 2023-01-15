import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from 'common/interface';
import { JwtStrategy } from './strategy/jwt.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    HttpModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService<EnvVars>) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRE_TIME') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, KakaoStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
