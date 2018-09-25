import Vue from 'vue'
import 'amfe-flexible/index.min.js'
import './publicUIConfig/UIUse'

import App from './App.vue'
import Skeleton from './components/Skeleton'
import router from './router/router'
import store from './store/store'
//导入全局时间过滤器，时间秒(s)格式化=> 00:00
import { formatDuring, learntimeFormat } from './utils/utils.js'
import { noAccessToken } from './utils/userAuth'
Vue.filter('formatDuring', formatDuring)
Vue.filter('learntimeFormat', learntimeFormat)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => {
    if (noAccessToken()) {
      store.dispatch('getAccessToken')
      return h(Skeleton, {
        props: {
          loading: true,
          active: true
        }
      })
    }
    return h(App)
  }
}).$mount('#app')
