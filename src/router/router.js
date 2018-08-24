import Vue from "vue";
import Router from "vue-router";
import NavBar from "../components/NavBar";
import Home from "../views/Home";
import My from "../views/My";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/app",
      component: NavBar,
      children: [
        { path: "", component: Home },
        { path: "home", component: Home },
        { path: "my", component: My }
      ]
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/About.vue")
    },
    {
      path: "/mock",
      name: "mock",
      component: () => import("../views/Mock.vue")
    }
  ]
});
