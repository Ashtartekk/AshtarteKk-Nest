import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class MainController {
  @Get()
  index() {
    return '我是后台首页';
  }
}
