import Vue from "vue";
import 'lib-flexible/flexible.js'
import './import'

import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
