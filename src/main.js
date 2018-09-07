import Vue from 'vue'
import 'amfe-flexible/index.min.js'
import './publicUIConfig/mintUIComponentImport'

import App from './App.vue'
import router from './router/router'
import store from './store/store'
import { Range, Popup } from 'mint-ui'
Vue.component(Popup.name, Popup)
Vue.component(Range.name, Range)
//导入全局时间过滤器，时间秒(s)格式化=> 00:00
import { formatDuring } from './utils/utils.js'
Vue.filter('formatDuring', formatDuring)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
