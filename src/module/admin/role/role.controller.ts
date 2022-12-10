import { Controller, Get, Query, Render, Response } from '@nestjs/common';
import { RoleService } from '../../../service/role/role.service';
import { Config } from '../../../config/config';
import { ToolsService } from 'src/service/tools/tools.service';

@Controller(`${Config.adminPath}/role`)
export class RoleController {
  constructor(
    private roleService: RoleService,
    private toolsService: ToolsService,
  ) {}
  //渲染角色列表页面
  @Get()
  @Render('admin/role/index')
  async index() {
    const result = await this.roleService.find({});
    console.log(result);
    return {
      roleList: result,
    };
  }
  //渲染增加角色页面
  @Get('add')
  @Render('admin/role/add')
  async add() {
    return {};
  }
  //增加角色
  @Get('doAdd')
  async doAdd(@Query() body, @Response() res) {
    const result = await this.roleService.add(body);
    if (body.title != '') {
      if (result) {
        this.toolsService.success(res, `${Config.adminPath}/role`);
      } else {
        this.toolsService.error(res, '增加失败', `${Config.adminPath}/role`);
      }
    } else {
      this.toolsService.error(res, '标题不能为空', `${Config.adminPath}/role`);
    }
  }
}
