import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KakaoStrategy {
  constructor(private readonly httpService: HttpService) {}

  async kakaoLogin(
    code: string,
    KAKAO_CLIENT_ID,
    KAKAO_REDIRECT_URI,
  ): Promise<{ name: string; email: string }> {
    const KAKAO_API_URI = `https://kauth.kakao.com/oauth/token
	?grant_type=authorization_code
	&client_id=${KAKAO_CLIENT_ID}
	&redirect_url=${KAKAO_REDIRECT_URI}
	&code=${code}`;

    const res = await firstValueFrom(this.httpService.post(KAKAO_API_URI));
    const accessToken = res.data['access_token'];
    const idToken = res.data['id_token'];

    const userInfo = await firstValueFrom(
      this.httpService.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );
    const kakaoAccount = userInfo.data['kakao_account'];
    const name = kakaoAccount.profile.nickname;
    const email = kakaoAccount.email;
    return { name, email };
  }
}
