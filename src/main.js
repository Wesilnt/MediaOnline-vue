import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";

import './import'

import { Button,Navbar, TabItem  } from "mint-ui";
Vue.component(Button.name, Button);
Vue.use(Navbar);
Vue.use(TabItem);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
