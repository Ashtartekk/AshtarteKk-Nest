/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const d = new Date();

export const AccessSchema = new mongoose.Schema({
  module_name: { type: String }, //模块名称
  action_name: { type: String }, //操作名称
  type: { type: Number }, //节点类型：1.表示模块 2.表示菜单 3.操作
  url: { type: String }, //路由跳转地址
  module_id: { type: Schema.Types.Mixed }, //此module_id和当前模型的_id关联 module_id = 0表示模块的一级分类 不为零的话可能是菜单 或者别的  Mixed为混合类型
  sort: { type: Number, default: 100 },
  description: { type: String },
  status: { type: Number, default: 1 },
  add_time: { type: Number, default: d.getTime() },
});
