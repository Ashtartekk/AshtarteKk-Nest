import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  //配置模板引擎
  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');

  //配置cookie中间件
  app.use(cookieParser('this signed cookies'));

  //配置session的中间件
  app.use(
    session({
      secret: '6a1a165f-00c2-454a-901b-d93ecea48bf1',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 219000, httpOnly: true },
      rolling: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
