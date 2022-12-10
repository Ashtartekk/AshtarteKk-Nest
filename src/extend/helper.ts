/* eslint-disable prettier/prettier */
//封装方法 比如一些时间戳 扩展模板方法
import { format, fromNow } from 'silly-datetime';
export class Helper {
  static title = '我是全局的title';
  static substring = function (str: string, start: number, end: number) {
    if (end) {
      return str.substring(start, end);
    } else {
      return str.substring(start);
    }
  };
  //转换时间戳的方法
  static formatTime(params) {
    return format(params, 'YYYY-MM-DD HH:mm');
  }
}
