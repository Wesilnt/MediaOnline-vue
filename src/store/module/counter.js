import {decrement, increment, log} from "./type";

const counter={
    namespaced:true,
    state: {
        sheep: 0,
    },
    getters:{
        odevity:({sheep})=>{
            const isOdd=sheep%2===0;
            if(isOdd){
                return '这是个偶数（getters使用体验）'
            }else{
                return '这是个奇数（getters使用体验）'
            }
        }
    },
    mutations: {// 必须为同步函数
        [increment](state) {
            state.sheep++;
        },
        [decrement](state) {
            const { sheep } = state;
            if (sheep > 0) state.sheep--;
            else {
                throw new Error("不能再减啦");
            }
        },

    },
    actions: {// 可为异步函数
        mapArgs({commit,state,getters}){
            // ....
        },
        [log]({state}){
            console.log(state.sheep);
        },
        async [increment]({dispatch,commit,state}){
            await commit(increment);
            await dispatch(log);
            console.log('异步处理完成');
        },
        [decrement]({commit}){
            commit(decrement)
        }

    }
};
export default counter;