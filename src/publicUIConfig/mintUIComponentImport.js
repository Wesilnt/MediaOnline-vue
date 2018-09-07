import 'vant/packages/vant-css/src/base.css'

// 引入组件对应的样式
import 'vant/packages/vant-css/src/button.css'
import 'vant/packages/vant-css/src/checkbox.css'

import Vue from 'vue'
import { Button, Tab, Tabs, Toast, Tag, Swipe, SwipeItem  } from 'vant'

Vue.use(Toast)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Tab).use(Tabs)
Vue.use(Swipe).use(SwipeItem);