import Vue from 'vue'
import { Swipe, SwipeItem, Header, Tabbar, TabItem, Button, InfiniteScroll ,Navbar} from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name, Header)
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Button.name, Button);
Vue.use(Navbar);
Vue.use(TabItem);
Vue.use(InfiniteScroll);
