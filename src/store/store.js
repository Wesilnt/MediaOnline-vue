import Vue from "vue";
import Vuex from "vuex";
import counter from "./module/counter";
import mocker from "./module/mock";
import myPuzzle from "./module/myPuzzle";

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    counter,
    mocker,
      myPuzzle
  }
});
