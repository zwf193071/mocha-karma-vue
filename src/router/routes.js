/**
 * @description router构造器的routes,禁止修改和删除！！！！
 */

import Login from '@/views/Login/Login';
import Home from '@/views/Home/Home';
import SystemPatrol from '@/views/SystemPatrol';

const routes = [
  {  
    path: '/',
    component: Login
  },
  {  
    path: '/home',
    component: Home,
    children: [
      {
        path: 'SystemPatrol',
        component: SystemPatrol
      }
    ]
  }
];

export default routes;