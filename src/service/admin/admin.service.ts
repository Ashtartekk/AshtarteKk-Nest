import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminInterface } from '../../interface/admin.interface';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private readonly adminModel) {}
  //查询
  async find(json: AdminInterface = {}, fileds?: string) {
    //定义查询服务
    return await this.adminModel.find(json, fileds);
  }
  //增加
  async add(json: AdminInterface) {
    try {
      const role = new this.adminModel(json);
      const result = await role.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  //更新
  async update(json1: AdminInterface, json2: AdminInterface) {
    try {
      //第一个参数是指要更新哪条数据 第二个参数是要更新的数据
      const result = await this.adminModel.updateOne(json1, json2);
      return result;
    } catch (error) {
      return [];
    }
  }
  //删除删除
  async delete(json: AdminInterface) {
    try {
      //第一个参数是指要更新哪条数据 第二个参数是要更新的数据
      const result = await this.adminModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }
  //获取adminmodel
  getModel() {
    return this.adminModel;
  }
}
