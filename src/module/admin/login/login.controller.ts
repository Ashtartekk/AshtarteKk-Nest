import { Controller, Get, Render, Request, Response } from '@nestjs/common';
import { ToolsService } from '../../../service/tools/tools.service';

@Controller('admin/login')
export class LoginController {
  constructor(private toolservice: ToolsService) {}
  @Get()
  @Render('admin/login')
  index() {
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
}
