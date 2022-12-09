import { Controller, Get, Render } from '@nestjs/common';
import { Config } from '../../../config/config';

@Controller(`${Config.adminPath}/manager`)
export class ManagerController {
  @Get()
  @Render('admin/manager/index') //主页
  index() {
    return {};
  }
  @Get('add') //增加页面
  @Render('admin/manager/add')
  add() {
    return {};
  }
  @Get('edit') //编辑页面
  @Render('admin/manager/edit')
  edit() {
    return {};
  }
}
