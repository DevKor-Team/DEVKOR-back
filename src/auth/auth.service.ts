import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrpyt from 'bcrypt';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { Role } from 'src/users/users.enum';
import { UpdateRoleParam } from 'src/users/dto/update-user.dto';
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

    const user = await this.userService.fetchUserByEmail(userInfo.email);

    if (!user) {
      await this.userService.createOAuthUser(userInfo);
      return { result: 'register' };
    }

    if (user && user.role === 'unauthenticated') {
      return { result: 'unauthenticated' };
    }

    if (user && (user.role === Role.Admin || user.role === Role.User)) {
      const payload = { role: user.role, sub: user.id };

      return { result: 'success', access_token: this.jwtService.sign(payload) };
    }
  }

  async updateUserRole(userId: number, updateRoleParams: UpdateRoleParam) {
    const user = await this.userService.fetchUserById(userId);

    if (!user) {
      return null;
    }

    await this.userService.updateRole(userId, updateRoleParams);
    return userId;
  }
}
