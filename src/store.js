import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex) // 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex),调用了才能通过 this.$store访问

// 便于全局访问
window.store = new Vuex.Store({
    // 数据仓库
    state: {
        count: 0,
        time:"",
        yz:"",
        platformType: kit.platformType(),// 平台类型
        airLever:{
            "1": "优",
            "2": "良",
            "3": "轻度污染",
            "4": "中度污染",
            "5": "重度污染",
            "6": "严重污染",
        }
    },
    // 做一些计算输出,注意，如果count不改变，只会触发一次,所以，这玩意，应该放在mtations里面
    getters: {  
        big(state) {
           return console.log(state.count + 5);
        }
    },
    // 唯一更改数据的方法
    mutations: {
        setYz(state,aaa) {
            // console.log(aaa)
            state.yz = aaa;
        },
        setTime(state,aaa) {
            // console.log(aaa)
            state.time = aaa;
        },
        increment: function (state) {
            //setTimeout(() => {
                state.count++;
            // },1000)
            // console.log(state.count)
        },
        decrement: function (state) {
            state.count--;
        }
    },
    // Action 类似于 mutation，不同在于：Action 提交的是多个mutation，而不是直接变更状态。Action 可以包含任意异步操作，复杂操作。
    actions: {
        increment (context) {
          context.commit('increment')
        }
    }
});



// 原生态触发方法
store.commit('increment')

// 取得值,如果注册在了vue实例中，则可以用 this.$store.state获取数据源
store.state.count// 1

export default store;