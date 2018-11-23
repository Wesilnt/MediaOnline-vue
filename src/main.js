import Vue from 'vue'
import 'amfe-flexible/index.min.js'
import './publicUIConfig/UIUse'

import router from './router/router'
import store from './store/store'

import App from './App.vue'
import SkeletonFullScreen from './components/SkeletonFullScreen'
//导入全局时间过滤器，时间秒(s)格式化=> 00:00
import { formatDuring, learntimeFormat } from './utils/utils.js'
import { IS_ONLINE } from './utils/config'
import { noAccessToken } from './utils/userAuth'
Vue.filter('formatDuring', formatDuring)
Vue.filter('learntimeFormat', learntimeFormat)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.name === 'AudioPlay') {
    to.meta.keepAlive = from.name === 'AudioCmts'
  }
  next()
})

new Vue({
  router,
  store,
  render: h => {
    if (noAccessToken() && IS_ONLINE) {
      store.dispatch('getAccessToken')
      return h(SkeletonFullScreen)
    }
    return h(App)
  }
}).$mount('#app')
