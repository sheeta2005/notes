import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/about',
    name: 'About',
    //相对性能更高，懒导入
    component: ()=> import(/* webpackChunkName: "about" */'../views/AboutView.vue')
  },
    {
    path: '/404',
    //相对性能更高，懒导入
    component: ()=> import(/* webpackChunkName: "404" */'../views/404.vue')
  },
      {
    path: '/c',
    //相对性能更高，懒导入
    component: ()=> import(/* webpackChunkName: "c" */'../views/container/ContainerView.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(), // 使用 history 模式（无 # 号）
  routes
})

export default router