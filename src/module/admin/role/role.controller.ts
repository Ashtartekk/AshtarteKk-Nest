import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  Response,
  Query,
} from '@nestjs/common';
import { RoleService } from '../../../service/role/role.service';
import { AccessService } from 'src/service/access/access.service';
import { ToolsService } from '../../../service/tools/tools.service';
import { RoleAccessService } from 'src/service/role-access/role-access.service';

import { Config } from '../../../config/config';
@Controller(`${Config.adminPath}/role`)
export class RoleController {
  constructor(
    private roleService: RoleService,
    private toolsService: ToolsService,
    private accessService: AccessService,
    private roleAccessService: RoleAccessService,
  ) {}
  //渲染角色列表
  @Get()
  @Render('admin/role/index')
  async index() {
    const result = await this.roleService.find({});

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
  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    if (body.title != '') {
      const result = await this.roleService.add(body);

      if (result) {
        this.toolsService.success(res, `/${Config.adminPath}/role`);
      } else {
        this.toolsService.error(res, '增加失败', `/${Config.adminPath}/role`);
      }
    } else {
      this.toolsService.error(res, '标题不能为空', `/${Config.adminPath}/role`);
    }
  }
  //渲染编辑页面
  @Get('edit')
  @Render('admin/role/edit')
  async edit(@Query() query) {
    const result = await this.roleService.find({ _id: query.id });
    return {
      roleList: result[0],
    };
  }
  //编辑
  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    if (body.title != '') {
      const result = await this.roleService.update({ _id: body._id }, body);
      if (result) {
        this.toolsService.success(res, `/${Config.adminPath}/role`);
      } else {
        this.toolsService.error(res, '增加失败', `/${Config.adminPath}/role`);
      }
    } else {
      this.toolsService.error(res, '标题不能为空', `/${Config.adminPath}/role`);
    }
  }
  //删除
  @Get('delete')
  async delete(@Query() query, @Response() res) {
    await this.roleService.delete({ _id: query.id });
    this.toolsService.success(res, `/${Config.adminPath}/role`);
  }
  //授权路由
  @Get('auth')
  @Render('admin/role/auth')
  async auth(@Query() query) {
    //1、在access表中找出 module_id = 0 的数据
    //2、让access表和access表关联  条件：找出access表中的module_id 等于 _id 的数据
    const role_id = query.id;
    const result = await this.accessService.getModel().aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
      {
        $match: {
          module_id: '0',
        },
      },
    ]);
    return {
      list: result,
      role_id: role_id,
    };
  }

  //提交权限修改
  @Post('doAuth')
  async doAuth(@Body() body, @Response() res) {
    const role_id = body.role_id;
    const access_node = body.access_node;
    //1.删除当前角色下面的所有权限
    await this.roleAccessService.deleteMany({ role_id: role_id });
    //2.给role_access增加数据 把获取的权限和橘色增加到数据库
    for (let i = 0; i < access_node.length; i++) {
      this.roleAccessService.add({
        role_id: role_id,
        access_id: access_node[i],
      });
    }
    this.toolsService.success(
      res,
      `/${Config.adminPath}/role/auth?id=${role_id}`,
    );
    return body;
  }
}
