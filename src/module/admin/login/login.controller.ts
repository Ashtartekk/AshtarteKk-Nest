import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  Body,
  Response,
} from '@nestjs/common';
import { ToolsService } from '../../../service/tools/tools.service';
import { AdminService } from '../../../service/admin/admin.service';

@Controller('admin/login')
export class LoginController {
  constructor(
    private toolservice: ToolsService,
    private adminService: AdminService,
  ) {}
  @Get()
  @Render('admin/login')
  async index() {
    console.log(await this.adminService.find());
    return {};
  }

  @Get('code')
  getCode(@Request() req, @Response() res) {
    const svgCaptcha = this.toolservice.getcaptcha();
    //设置session
    req.session.code = svgCaptcha.text;
    res.type('svg');
    res.send(svgCaptcha.data);
  }
  //接收数据
  @Post('doLogin')
  async doLogin(@Body() body, @Request() req, @Response() res) {
    try {
      const code: string = body.code;
      const username: string = body.username;
      let password: string = body.password;
      if (username == '' || password.length < 6) {
        console.log('用户名或密码不合法');
      } else {
        //转化成大写 无论用户输入的是大写还是小写都能匹配到
        if (code.toUpperCase() == req.session.code.toUpperCase()) {
          password = this.toolservice.getMd5(body.password);
          console.log(password);
          const userResult = await this.adminService.find({
            username: username,
            password: password,
          });
          console.log(userResult);
          if (userResult.length > 0) {
            console.log('登录成功');
            req.session.userinfo = userResult[0]; //把查询到的数据返回给session
            res.redirect('/admin/main');
          } else {
            res.redirect('/admin/login');
            console.log('用户名或者密码不正确');
          }
        } else {
          console.log('验证码不正确');
          res.redirect('/admin/login');
        }
      }
    } catch (error) {
      res.redirect('/admin/login');
    }

    console.log(body);
    return '成功';
  }
  /**
   * 1.需要在前端农业面用js验证用户输入的信息是否正确
   * 2.验证码正确的话对表单里的密码进行md5加密 cnpm install md5 --save
   * 3.在用户表的集合里查询当前用户是否存在
   * 4.如果存在就登录成功 保存用户信息然后跳转到后台管理系统
   * 5.如果数据库没有该用户就登录失败 就返回登录页面
   */
}
