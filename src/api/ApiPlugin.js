/**
 * @author AlanChen
 * @class Plugins 安装api插件模块的加载器
 * @constructor 构造器无参数
 * @static install  类的静态方法,参数为一个对象或数组，数组项对象必须包含name，success,error键，可选autoExecute
 */
export default class Plugins {
    static install (item) {
        if (Array.isArray(item)) {
            this.prototype.data = [...this.prototype.data, ...item];
        } else if (item instanceof Object) {
            this.prototype.data.push(item);
        } else if (!item) {
            throw new Error(`Type Error! The param is not a string or an array.
                    参数出错，参数不是字符串或者数组`);
        }
    }
}
Plugins.prototype.data = [];