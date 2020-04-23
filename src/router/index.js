import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';


/**
 * 重写路由的push方法
 * 解决，相同路由跳转时，报错
 * 添加，相同路由跳转时，触发watch
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push (location) {
    return routerPush.call(this, location).catch(error => error);
};
Vue.use(Router);

const router = new Router({
    // mode: 'history',
    routes
});
export default router;