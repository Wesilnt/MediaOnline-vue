import Vue from "vue";
import 'lib-flexible/flexible.js'
import './publicUIConfig/mintUIComponentImport'

import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import { Range,Popup } from "mint-ui"
Vue.component(Popup.name, Popup)
Vue.component(Range.name, Range)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
