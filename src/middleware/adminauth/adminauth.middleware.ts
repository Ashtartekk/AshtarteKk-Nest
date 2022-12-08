import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('中间件');
    //1.获取session里保存的用户信息
    const userinfo = req.session.userinfo; //session里的用户信息
    const pathname = req.baseUrl; //获取访问的地址
    if (userinfo) {
      //存在userinfo表示登录了
      next();
    } else {
      if (
        //排除不需要进行权限判断的页面
        pathname === '/admin/login' ||
        pathname === '/admin/login/code' ||
        pathname === '/admin/login/doLogin'
      ) {
        next();
      } else {
        //重定向到登录页面
        res.redirect('/admin/login');
      }
    }
  }
}
