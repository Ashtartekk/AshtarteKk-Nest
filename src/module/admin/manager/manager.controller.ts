import { Body, Controller, Get, Post, Render, Response } from '@nestjs/common';
import { Config } from '../../../config/config';
import { AdminService } from 'src/service/admin/admin.service';
import { ToolsService } from 'src/service/tools/tools.service';
import { RoleService } from 'src/service/role/role.service';

@Controller(`${Config.adminPath}/manager`)
export class ManagerController {
  constructor(
    private adminService: AdminService,
    private roleService: RoleService,
    private toolsService: ToolsService,
  ) {}
  @Get()
  @Render('admin/manager/index') //主页
  async index() {
    //获取admin表以及role表关联数据
    const result = await this.adminService.getModel().aggregate([
      {
        $lookup: {
          from: 'role', //和role关联
          localField: 'role_id', //admin表关联的是role_id
          foreignField: '_id', //role表关联的是_id
          as: 'role',
        },
      },
    ]);
    return {
      adminResult: result, //这一步是为了让前台拿到数据
    };
  }
  @Get('add') //增加页面
  @Render('admin/manager/add')
  async add() {
    //查询角色数据
    const roleResult = await this.roleService.find();
    return {
      roleList: roleResult,
    };
  }
  //增加管理员
  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    if (body.username == '' || body.password.length < 6) {
      this.toolsService.error(
        res,
        '用户名或密码不合法',
        `/${Config.adminPath}/manager/add`,
      );
    } else {
      //从数据库查询当前用户名是否存在
      const adminResult = await this.adminService.find({
        username: body.username,
      });
      if (adminResult.length > 0) {
        this.toolsService.error(
          res,
          '此管理员已经存在',
          `/${Config.adminPath}/manager/add`,
        );
      } else {
        body.password = this.toolsService.getMd5(body.password);
        this.adminService.add(body);
        this.toolsService.success(res, `/${Config.adminPath}/manager`);
      }
    }
  }
  @Get('edit') //编辑页面
  @Render('admin/manager/edit')
  edit() {
    return {};
  }
}
