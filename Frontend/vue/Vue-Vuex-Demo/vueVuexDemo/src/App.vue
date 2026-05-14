<script setup>
import { useStore } from 'vuex'
const store = useStore()

const handleUpdate = () => {
  // 两种写法都可以，推荐第一种
  store.commit('SetName', 'Lisi')
  // 或
  // store.commit({ type: 'SetName', payload: 'Lisi' })
}
</script>

<template>
  <button @click="handleUpdate">修改名字</button>
</template>

<style scoped></style>
