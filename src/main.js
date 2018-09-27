import Vue from 'vue'
import 'amfe-flexible/index.min.js'
import './publicUIConfig/UIUse'

import router from './router/router'
import store from './store/store'

import App from './App.vue'
import VueQRCodeComponent from 'vue-qrcode-component'
import Skeleton from './components/Skeleton'
//导入全局时间过滤器，时间秒(s)格式化=> 00:00
import { formatDuring, learntimeFormat } from './utils/utils.js'
import { ISONLINE } from './utils/config'
import { noAccessToken } from './utils/userAuth'
Vue.filter('formatDuring', formatDuring)
Vue.filter('learntimeFormat', learntimeFormat)
Vue.config.productionTip = false
Vue.component('qr-code', VueQRCodeComponent)

new Vue({
  router,
  store,
  render: h => {
    if (noAccessToken() && ISONLINE) {
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
