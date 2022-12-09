/* eslint-disable prettier/prettier */
//封装方法 比如一些时间戳
export class Helper {
  static title = '我是全局的title';
  static substring = function (str: string, start: number, end: number) {
    if (end) {
      return str.substring(start, end);
    } else {
      return str.substring(start);
    }
  };
}
