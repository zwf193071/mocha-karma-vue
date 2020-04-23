/*
 * @Author: 徐玲
 * @Description: 登陆失败提示信息
 * @Date: 2019-08-20 16:58:26
 * @LastEditTime: 2019-08-27 08:50:54
 * @LastEditors: 徐玲
 * @UpdateLogs: 优化：1.修改账号密码错误的提示信息
 */
import vm from '@/main'; // vue实例
import Storage from '@/utils/Storage';

// 处理所有接口公共状态逻辑的模块
export default {
    name: 'commonStatusHandle',
    autoExecute: true,
    // 登陆超时
    loginFail () {
        vm.$Notice.info({
            title: '账号提示',
            desc: '您登陆已超时，请重新登陆'
        });
        Storage.clear(); // 清除storage
        vm.$router.push('/');
    },
    // 账号密码错误
    unAuthorized () {
        vm.$Notice.info({
            title: '账号提示',
            desc: '您的账号密码有误，请重新输入'
        });
        Storage.clear(); // 清除storage
        vm.$router.push('/');
    },
    // 登陆超时
    gatewayTimeout () {
        vm.$Notice.info({
            title: '超时提示',
            desc: '请求超时，请重新登陆'
        });
        Storage.clear(); // 清除storage
        vm.$router.push('/');
    }
};