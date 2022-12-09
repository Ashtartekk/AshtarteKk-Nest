import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from 'src/config/config';
import { Helper } from '../../extend/helper';

@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    //配置全局变量  和动态路由的config一致
    res.locals.config = Config;
    //配置全局方法
    res.locals.helper = Helper;
    next();
  }
}
