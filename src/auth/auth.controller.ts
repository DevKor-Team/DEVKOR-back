import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/users/users.enum';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  /**
   * 카카오 oauth 2.0 REST API
   * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
   *
   */
  @Get('/kakao')
  async kakaoLogin() {
    const REQUEST_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${this.config.get(
      'KAKAO_CLIENT_ID',
    )}&redirect_uri=${this.config.get(
      'KAKAO_REDIRECT_URI',
    )}&response_type=code`;

    return REQUEST_URI;
  }

  @Get('/kakao/callback')
  async kakaoCallBack(@Query('code') code: string) {
    const result = await this.authService.kakaoLogin(
      code,
      this.config.get('KAKAO_CLIENT_ID'),
      this.config.get('KAKAO_REDIRECT_URI'),
    );
  }
}
