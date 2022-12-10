import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleInterface } from 'src/interface/role.interface';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel) {}
  //查询角色
  async find(json: RoleInterface, fileds?: string) {
    try {
      return await this.roleModel.find(json, fileds);
    } catch (error) {
      return [];
    }
  }
  //增加角色
  async add(json: RoleInterface) {
    try {
      const role = new this.roleModel(json);
      const result = role.save();
      return result;
    } catch (error) {
      return [];
    }
  }

  //更新角色
  async update(json1: RoleInterface, json2: RoleInterface) {
    try {
      //第一个参数是指要更新哪条数据 第二个参数是要更新的数据
      const result = await new this.roleModel.updateOne(json1, json2);
      return result;
    } catch (error) {
      return [];
    }
  }
  //删除角色
  async delete(json: RoleInterface) {
    try {
      //第一个参数是指要更新哪条数据 第二个参数是要更新的数据
      const result = await new this.roleModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }
}
