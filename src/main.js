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
import { formatDuring,learntimeFormat} from './utils/utils.js'
Vue.filter('formatDuring', formatDuring)
Vue.filter('learntimeFormat', learntimeFormat)
Vue.config.productionTip = false

//vant组件引入
import { SwipeCell, Dialog,List ,Cell} from 'vant'
import { Popup, Toast, Field,Loading } from 'vant'
import { RadioGroup,Radio, Picker } from 'vant'
import { Lazyload } from 'vant';
Vue.use(Cell)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(SwipeCell)
Vue.use(Dialog)
Vue.use(List)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Loading);
Vue.use(Picker)
Vue.use(Lazyload)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
