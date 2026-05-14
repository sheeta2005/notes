<script setup lang="ts">
import {useConterStore} from '@/stores/counter'
import {onMounted} from "vue";
import  {storeToRefs} from 'pinia'

const counterStore = useConterStore()
onMounted(()=>{
  counterStore.getList()
})
//该方法只负责数据动态解构
const {count,doubleCount} =storeToRefs(counterStore)

//对方法依旧从。。解构赋值
const {implement} =counterStore


</script>

<template>
<button @click="counterStore.increment()">{{counterStore.count}}</button>
  <div>{{counterStore.doubleCount}}</div>
<ul>
  <li v-for="item in counterStore.list":key="item.id">{{item.name}}</li>
</ul>

</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
