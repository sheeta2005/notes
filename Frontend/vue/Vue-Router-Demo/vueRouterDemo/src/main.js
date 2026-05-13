import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 引入路由
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



createApp(App)
  .use(router) // 注册路由
  .use(ElementPlus)
  .mount('#app')
