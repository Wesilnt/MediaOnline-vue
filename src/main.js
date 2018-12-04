import Vue from 'vue'
import 'amfe-flexible/index.min.js'
import './publicUIConfig/UIUse'

import router from './router/router'
import store from './store/store'

import App from './App.vue'
import SkeletonFullScreen from './components/SkeletonFullScreen'
//导入全局时间过滤器，时间秒(s)格式化=> 00:00
import { formatDuring, learntimeFormat ,formatYMD} from './utils/utils.js'
import { IS_ONLINE } from './utils/config'
import { noAccessToken } from './utils/userAuth'
Vue.filter('formatDuring', formatDuring);
Vue.filter('formatYMD', formatYMD);
Vue.filter('learntimeFormat', learntimeFormat);
Vue.config.productionTip = false

console.log(router)
// const { fullPath } = this.$route
/*if (!fullPath.includes('?')) {
    const newPathArr = fullPath.split('&')
    const len = newPathArr.length
    if (len <= 1) {
        return
    }
    const newp = newPathArr.reduce((prev, item, index) => {
        if (index === 1) {
            prev += '?' + item
        } else if (index > 1) {
            prev += '&' + item
        } else {
            prev += item
        }
        return prev
    }, '')
    // originUrl+newp
    console.log(newp)
}*/


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
