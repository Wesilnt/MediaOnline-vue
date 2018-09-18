import Vue from 'vue'
import 'amfe-flexible/index.min.js'
import './publicUIConfig/UIUse'

import App from './App.vue'
import router from './router/router'
import store from './store/store'
// import { Range, Popup } from 'mint-ui'
// Vue.component(Popup.name, Popup)
// Vue.component(Range.name, Range)
//导入全局时间过滤器，时间秒(s)格式化=> 00:00
import { formatDuring } from './utils/utils.js'
Vue.filter('formatDuring', formatDuring)
Vue.config.productionTip = false

//vant组件引入
import { Popup, Toast, Field } from 'vant'
import { SwipeCell, Dialog,List ,Cell} from 'vant'
import { RadioGroup,Radio, Area } from 'vant'
Vue.use(Cell)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(SwipeCell)
Vue.use(Dialog)
Vue.use(List)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Area)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
