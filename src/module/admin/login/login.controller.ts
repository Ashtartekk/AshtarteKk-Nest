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
import { get } from 'http';

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
      const code: string = body.code; //获取用户输入的验证码
      const username: string = body.username; //获取用户输入的用户名
      let password: string = body.password; //获取用户输入的密码
      if (username == '' || password.length < 6) {
        //当用户名为空或密码长度大于6 输出用户名或密码不合法
        this.toolservice.error(res, '用户名或密码不合法', '/admin/login');
      } else {
        //转化成大写 无论用户输入的是大写还是小写都能匹配到 //当验证码和session里的验证码相同时
        if (code.toUpperCase() == req.session.code.toUpperCase()) {
          password = this.toolservice.getMd5(body.password); //使用md5进行加密
          const userResult = await this.adminService.find({
            //查询用户表中匹配的用户名和密码
            username: username,
            password: password,
          });
          if (userResult.length > 0) {
            //当有返回值得时候登录成功
            console.log('登录成功');
            req.session.userinfo = userResult[0]; //把查询到的数据返回给session
            this.toolservice.success(res, '/admin/main'); //跳转到主页
          } else {
            this.toolservice.error(res, '用户名或密码不正确', '/admin/login');
          }
        } else {
          this.toolservice.error(res, '验证码不正确', '/admin/login');
        }
      }
    } catch (error) {
      res.redirect('/admin/login'); //不成功就重定向到登录页
    }
    return '成功'; //这个是doLogin路由的登录成功
  }
  /**
   * 1.需要在前端农业面用js验证用户输入的信息是否正确
   * 2.验证码正确的话对表单里的密码进行md5加密 cnpm install md5 --save
   * 3.在用户表的集合里查询当前用户是否存在
   * 4.如果存在就登录成功 保存用户信息然后跳转到后台管理系统
   * 5.如果数据库没有该用户就登录失败 就返回登录页面
   */
  @Get('loginOut') //退出登录路由
  loginOut(@Request() req, @Response() res) {
    req.session.userinfo = null;
    res.redirect('/admin/login');
  }
}
