import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  strict:  process.env.NODE_ENV !== 'production',
  state: {
    count: 0,
    sheep: 1
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      const { count } = state;
      if (count > 0) state.count--;
      else {
        throw new Error("不能再减啦");
      }
    }
  }
  // actions: {}
});
