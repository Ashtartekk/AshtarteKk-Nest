import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
import { ToolsService } from './service/tools/tools.service'; //定义工具类服务
import { MongooseModule } from '@nestjs/mongoose'; //定义数据库

//配置中间件
import { AdminauthMiddleware } from './middleware/adminauth/adminauth.middleware';
import { InitMiddleware } from './middleware/init/init.middleware';
import { Config } from './config/config';
import { AccessService } from './service/access/access.service';

@Module({
  imports: [
    AdminModule,
    DefaultModule,
    ApiModule,
    MongooseModule.forRoot('mongodb://localhost/nestxiaomi', {
      useNewUrlParser: true,
    }),
  ],
  controllers: [],
  providers: [ToolsService, AccessService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminauthMiddleware) //当访问admin下的路由时 访问这个中间件
      .forRoutes(`${Config.adminPath}/*`) //只有admin/的路由才会应用这个中间件
      .apply(InitMiddleware) //全局变量的中间件
      .forRoutes('*'); //所有的路由都要应用这个中间件;
  }
}
