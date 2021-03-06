// import 'vant/packages/vant-css/src/base.css'

// 引入组件对应的样式
// import 'vant/packages/vant-css/src/button.css'
// import 'vant/packages/vant-css/src/checkbox.css'
import loading from '../assets/images/loading.png'

import Vue from 'vue'
import {
  Button,
  Tab,
  Tabs,
  Toast,
  Tag,
  Swipe,
  Slider,
  SwipeItem,
  Popup,
  PullRefresh,
  Progress,
  Lazyload,
  SwipeCell,
  Dialog,
  List,
  Cell,
  Field,
  Loading,
  RadioGroup,
  Radio,
  Picker,
  Checkbox,
  CheckboxGroup,
  Circle,
  Switch
} from 'vant'

Vue.use(Cell)
Vue.use(Popup)
Vue.use(Slider)
Vue.use(SwipeCell)
Vue.use(Dialog)
Vue.use(List)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Loading)
Vue.use(Picker)
Vue.use(Progress)
Vue.use(Toast)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Circle)
Vue.use(Tab).use(Tabs)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Lazyload, {
  error: loading,
  loading: loading,
  lazyComponent: true,
  attempt: 5
})
Vue.use(PullRefresh)
