import Vue from "vue";
import Vuex from "vuex";
import counter from "./module/counter";
import mocker from "./module/mock";
import myPuzzle_Praise from "./module/myPuzzle_Praise";
import columnInfo from "./module/columnInfo"
import homeData from './module/homeData'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    counter,
    mocker,
    myPuzzle_Praise,
    homeData,
    columnInfo

  }
})
