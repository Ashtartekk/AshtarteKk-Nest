import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccessInterface } from 'src/interface/access.interface';

@Injectable()
export class AccessService {
  constructor(@InjectModel('access') private readonly accessModel) {}
  //查询
  async find(json: AccessInterface = {}, fileds?: string) {
    //定义查询服务
    return await this.accessModel.find(json, fileds);
  }
  //增加
  async add(json: AccessInterface) {
    try {
      const role = new this.accessModel(json);
      const result = await role.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  //更新
  async update(json1: AccessInterface, json2: AccessInterface) {
    try {
      //第一个参数是指要更新哪条数据 第二个参数是要更新的数据
      const result = await this.accessModel.updateOne(json1, json2);
      return result;
    } catch (error) {
      return [];
    }
  }
  //删除删除
  async delete(json: AccessInterface) {
    try {
      //第一个参数是指要更新哪条数据 第二个参数是要更新的数据
      const result = await this.accessModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }
  //获取accessmodel
  //   getModel() {
  //     return this.accessModel;
  //   }
}
