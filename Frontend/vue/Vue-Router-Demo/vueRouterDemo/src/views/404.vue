<template>
  <div >
    <h1>404 - 页面走丢了</h1>
    <p>抱歉，你访问的页面不存在或已被移除。</p>
    <button @click="goHome">返回首页</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #ff4d4f;
}

button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>