/**
 * @author AlanChen
 * @module apiCover 二次封装api接口函数的模块
 * @param {String} url 请求路径的别名，与apiConfig模块一致
 * @param {Object} data 请求内容参数
 * @param {String | Array} tips 返回数据后对response.code处理的提示语
 * @param {Boolean} isShowError 是否弹出默认的错误提示，默认为true
 * @returns {Promise} then的参数为一个包含type和data的对象。type为returnCode中的一种
 */

import { api } from './index';
import Plugin from './ApiPlugin';
import vm from '@/main';    // vue实例

import Message from './Plugins/Message';
import CommonStatusHandle from './Plugins/CommonStatusHandle';
import Log from './Plugins/Log';
Plugin.install([Message, CommonStatusHandle, Log]);

// api接口模块(axios)返回的后台转态码，后台约定的code
const returnCode = {
    success: 200, // 请求成功
    fail: 500, // 请求失败，可能是后台代码或数据库出错，可能是自定义错误。通过响应体中的error-message是否存在来判断
    notFound: 404, // 请求失败，资源未找到
    unAuthorized: 401, // 鉴权失败
    gatewayTimeout: 504 // 请求超时
};

/**
 * @param {String} url 请求地址的别名，必选
 * @param {Object} data 请求的参数,可选
 * @param {Object} dynamicRouterParams 请求的动态路由参数，可选，但当url对应的配置里dynamicRouter为true时必选
 * @param {*} tips 请求返回后根据returnCode的提示信息，用法见Message.js插件
 */
export default ({url, data, dynamicRouterParams, tips}) => {
    const p = new Plugin();
    const Message = p.data.find(a => a.name === 'Message');
    const AutoExecutePlugins = p.data.filter(a => a.autoExecute === true);

    let successTip, failTip;
    if (tips) {
        successTip = typeof tips === 'string' ? tips : tips[0];
        failTip = typeof tips === 'string' ? tips : tips[1];
    }
    const isTipsArray = Array.isArray(tips);

    return new Promise((resolve, reject) => {
        api({
            url,
            data,
            dynamicRouterParams
        })
        .then(res => {
            const type = 'success';
            // 自动执行模块对应type的回调函数
            AutoExecutePlugins && AutoExecutePlugins.forEach(a => {
                a[type] && a[type](url);
            });
            // Message需要单独逻辑
            if (successTip) Message[type](successTip);

            const thenData = {data: res.data, type};
            resolve(thenData);
        })
        .catch(error => {
            const { response } = error;
            let type, errMessage, errorCode;
            if (response) {
                type = Object.entries(returnCode).find(a => a[1] === response.status) ? Object.entries(returnCode).find(a => a[1] === response.status)[0] : '';
                // 后台的自定义错误
                if (response.data) {
                    errorCode = response.data['errorCode'];
                    errMessage = response.data['errorMessage'];
                    console.log(errMessage);
                }
            } else {
                console.log('Error', error.message);
            }

            if (errorCode) {
                vm.$Message.error({
                    content: errMessage
                });
            } else if (failTip && type && Message[type]) {
                if (typeof tips === 'string') {
                    Message[type](failTip, true, errMessage);
                } else if (isTipsArray) {
                    Message[type](failTip, false, errMessage);
                }
            }

            // 自动执行模块对应fail或notFound的回调函数
            if (type) {
                AutoExecutePlugins && AutoExecutePlugins.forEach(a => {
                    a[type] && a[type](url, errMessage);
                });
            }
            reject(response);
        });
    });
};