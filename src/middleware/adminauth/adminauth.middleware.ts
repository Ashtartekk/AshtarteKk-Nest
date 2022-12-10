import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from 'src/config/config';
/**
 * 中间件:路由拦截
 */
@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    //1.获取session里保存的用户信息
    const userinfo = req.session.userinfo; //session里的用户信息
    const pathname = req.baseUrl; //获取访问的地址
    if (userinfo) {
      //在session里有userinfo表示登录了
      //设置全局变量
      res.locals.userinfo = userinfo;
      next();
    } else {
      if (
        //排除不需要进行权限判断的页面
        pathname === `/${Config.adminPath}/login` ||
        pathname === `/${Config.adminPath}/login/code` ||
        pathname === `/${Config.adminPath}/login/doLogin`
      ) {
        next();
      } else {
        //重定向到登录页面
        res.redirect(`/${Config.adminPath}/login`);
      }
    }
  }
}
