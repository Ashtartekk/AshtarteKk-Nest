import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
import { ToolsService } from './service/tools/tools.service';
import { MongooseModule } from '@nestjs/mongoose';

//配置中间件
import { AdminauthMiddleware } from './middleware/adminauth/adminauth.middleware';

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
  providers: [ToolsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminauthMiddleware).forRoutes('admin/*'); //当访问admin下的路由时 访问这个中间件
  }
}
