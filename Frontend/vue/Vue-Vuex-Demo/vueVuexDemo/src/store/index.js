
import { createStore } from 'vuex'
import axios  from "axios";

export default createStore({
    state: {
        name: "xiba"
    },
    getters: {
    },
    mutations: {
        SetName(state,newName){
            state.name=newName
        }
    },
    actions: {
        setNameByAxios(context){
            axios({
                url:'/api/admin/employee.login',
                method: "POST",
                data: {
                    username: 'admin',
                    password: '123456'
                }
            }).then(res=>{
                if (res.data.code==1){
                context.commit('SetName',res.data.data.name)
                }
            })
        }
    },
    modules: {
    }
})