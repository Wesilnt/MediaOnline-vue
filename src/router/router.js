import Vue from "vue";
import Router from "vue-router";

import NavBar from "../components/NavBar";
import PageLoading from "../components/PageLoading";

import PageInfo_From_Home from "./router_home";
import PageInfo_From_My from "./router_my";
import PageInfo_From_OnlineCourse from "./router_onlineCourse";

const Home = () => import(/* webpackChunkName: "home" */ "../views/Home");
const My = () => import(/* webpackChunkName: "my" */ "../views/My");



const MyHOB = () => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: import('../views/My'),
    // 异步组件加载时使用的组件
    loading: PageLoading,
    // 加载失败时使用的组件
    error: null,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 2000,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 3000
});

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: NavBar,
      redirect: "/home",
      children: [
        { path: "", component: Home },
        { path: "home", component: Home },
        {
          path: "my",
          component: MyHOB
        }
      ]
    },
    ...PageInfo_From_Home,
    ...PageInfo_From_My,
    ...PageInfo_From_OnlineCourse
  ]
});
