import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrpyt from 'bcrypt';
import { KakaoStrategy } from './strategy/kakao.strategy';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private kakaoStrategy: KakaoStrategy,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.fetchUserByEmail(email);

    if (user && (await bcrpyt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async kakaoLogin(code: string, KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI) {
    const userInfo = await this.kakaoStrategy.kakaoLogin(
      code,
      KAKAO_CLIENT_ID,
      KAKAO_REDIRECT_URI,
    );

    // console.log(userInfo);
    const user = await this.userService.fetchUserByEmail(userInfo.email);

    if (!user) {
      await this.userService.createOAuthUser(userInfo);
      return { result: 'register' };
    }

    if (user && user.role === 'unauthenticated') {
      return { result: 'unauthenticated' };
    }

    return { result: 'success' };
  }
}
