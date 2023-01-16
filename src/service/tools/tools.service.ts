import { Injectable } from '@nestjs/common';

//引入验证码库
import * as svgCaptcha from 'svg-captcha';
//md5加密
import * as md5 from 'md5';

@Injectable()
export class ToolsService {
  getcaptcha() {
    //获取验证码
    const captcha = svgCaptcha.create({
      size: 1,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#27619e',
    });
    return captcha;
  }
  getMd5(str: string) {
    //Md5加密
    return md5(str);
  }
  async success(res, redirectUrl) {
    await res.render('admin/public/success', {
      //跳转成功方法
      redirectUrl: redirectUrl,
    });
  }
  async error(res, message, redirectUrl) {
    //跳转失败方法
    await res.render('admin/public/error', {
      message: message,
      redirectUrl: redirectUrl,
    });
  }
}
