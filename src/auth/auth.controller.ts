import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UpdateRoleDto } from 'src/users/dto/update-user.dto';
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
  async kakaoCallBack(@Query('code') code: string, @Res() res: Response) {
    const kakaoResponse = await this.authService.kakaoLogin(
      code,
      this.config.get('KAKAO_CLIENT_ID'),
      this.config.get('KAKAO_REDIRECT_URI'),
    );

    if (kakaoResponse.result != 'success') {
      return res.status(401).json('승인 완료 후 로그인이 가능합니다.');
    }

    // return JWT Bearer Token
    return res.status(200).send(kakaoResponse.access_token);
  }

  /**
   * Admin :: 회원가입 신청한 회원에 대해서 승인 ( user, admin으로 변경가능 )
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('authentication/:userId')
  async updateUserRole(
    @Request() req,
    @Param('userId') userId: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const userInfo = req.user;
    if (userInfo.role !== Role.Admin) {
      throw new UnauthorizedException();
    }

    const result = await this.authService.updateUserRole(userId, updateRoleDto);

    if (!result) {
      throw new BadRequestException();
    }

    return `User ${userId}의 Role이 ${updateRoleDto.role}으로 성공적으로 변경되었습니다.`;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('elimination/:userId')
  async deleteUser(@Request() req, @Param('userId') userId: number) {
    const userInfo = req.user;
    if (userInfo.role !== Role.Admin) {
      throw new UnauthorizedException();
    }
    const { affected } = await this.authService.deleteUser(userId);

    if (affected === 0) {
      throw new NotFoundException();
    }

    return { success: true, message: '회원 탈퇴 성공' };
  }
}
