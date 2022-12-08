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
  doLogin(@Body() body) {
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
