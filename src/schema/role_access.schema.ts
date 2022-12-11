/* eslint-disable prettier/prettier */
//  权限关联表
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const RoleAccessSchema = new mongoose.Schema({
  access_id: { type: Schema.Types.ObjectId },
  role_id: { type: Schema.Types.ObjectId },
});
