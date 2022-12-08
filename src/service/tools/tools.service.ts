import { Injectable } from '@nestjs/common';

//引入验证码库
import * as svgCaptcha from 'svg-captcha';
//md5加密
import * as md5 from 'md5';

@Injectable()
export class ToolsService {
  getcaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    });
    return captcha;
  }
  getMd5(str: string) {
    return md5(str);
  }
}
