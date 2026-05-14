import {defineStore} from "pinia";
import { ref, computed } from 'vue'
import axios from 'axios'

const API_URL= 'http://.........'

export const useConterStore = defineStore('counter', () => {
    //定义数据  state
    const count = ref(0)

    //定义getter
    const doubleCount = computed(() => count.value * 2)

    //定义修改数据的方法  action
    const increment = () => {
        count.value++
    }

    //定义异步action方法
    const list = ref([])
    const getList = async () => {
        try {
            const res = await axios.get(API_URL)
            list.value = res.data.data.channels
        } catch (err) {
            console.error('请求失败', err)
        }
    }


    return {
        count,
        doubleCount,
        list,
        getList,
        increment
    }

})