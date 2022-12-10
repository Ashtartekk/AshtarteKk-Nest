/* eslint-disable prettier/prettier */
//定义管理员接口
export interface AdminInterface {
  _id?: string;
  username?: string;
  password?: string;
  mobile?: string;
  email?: string;
  status?: number;
  role_id?: string;
  add_time?: number;
  is_supper?: number;
}
