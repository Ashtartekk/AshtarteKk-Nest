import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Response,
} from '@nestjs/common';
import { AccessService } from 'src/service/access/access.service';
import { ToolsService } from 'src/service/tools/tools.service';
import { Config } from 'src/config/config';
import * as mongoose from 'mongoose';

@Controller(`${Config.adminPath}/access`)
export class AccessController {
  constructor(
    private accessService: AccessService,
    private toolsService: ToolsService,
  ) {}
  //渲染权限列表
  @Get()
  @Render('admin/access/index')
  async index() {
    //1、在access表中找出  module_id=0的数据
    //2、让access表和access表关联    条件：找出access表中module_id等于_id的数据
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
    // console.log(JSON.stringify(result));
    return {
      list: result,
    };
    return {};
  }
  //渲染增加权限页面
  @Get('add')
  @Render('admin/access/add')
  async add() {
    //获取模块列表
    const result = await this.accessService.find({ module_id: '0' });
    return {
      moduleList: result,
    };
  }
  //增加模块
  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    const module_id = body.module_id;
    if (module_id != 0) {
      //当增加的模块不是顶级模块 就是module_id 不等于0的时候
      body.module_id = new mongoose.Types.ObjectId(module_id); //注意:新版mongoose需要加new关键词
    }
    await this.accessService.add(body);
    this.toolsService.success(res, `/${Config.adminPath}/access`);
  }
  @Get('edit')
  @Render('admin/access/edit')
  async edit(@Query() query) {
    //把查到的数组转换成对象
    const result = await this.accessService.find({ module_id: '0' });
    const accessResult = await this.accessService.find({ _id: query.id });
    return {
      list: accessResult[0],
      moduleList: result,
    };
  }
  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    try {
      const module_id = body.module_id;
      const _id = body._id;
      if (module_id != 0) {
        body.module_id = new mongoose.Types.ObjectId(module_id);
      }
      await this.accessService.update({ _id: _id }, body);
      this.toolsService.success(res, `/${Config.adminPath}/access`);
    } catch (error) {
      this.toolsService.error(
        res,
        '非法请求',
        `/${Config.adminPath}/access/edit?id=${body._id}`,
      );
    }
  }
  @Get('delete')
  async delete(@Query() query, @Response() res) {
    try {
      this.accessService.delete({ _id: query.id });
      this.toolsService.success(res, `/${Config.adminPath}/access`);
    } catch (error) {
      this.toolsService.error(res, '非法请求', `/${Config.adminPath}/access`);
    }
  }
}
