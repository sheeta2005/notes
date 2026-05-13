<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
 <div>
  <nav>
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>

    <input type="button" value="编程式路由跳转" @click="jump"/>
  </nav>
    <!-- 路由匹配到的组件会在这里渲染 -->
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    //编程式路由跳转
    jump() {
      this.$router.push('/about')
    }
  }
}
</script>
