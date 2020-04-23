import { ApiModule } from 'api-module';
import { globalConfig, apiConfig } from './config';
import apiCover from './ApiCover';

/**
 * @function api 封装axios的方法
 * @param {String} type 接口别名，与apiConfig中一致
 * @param {Object} data 请求内容参数
 * @returns {Object} 返回数据，与原生axios一致
 */
const apiModule = new ApiModule(globalConfig);
const api = apiModule.createApi(apiConfig);

export {
    api,
    apiCover,
    apiModule
};