<template>
    <div>
        <router-view/>
        <div class="navbar">
            <div v-for="(nav) in navbar" :key="nav.path" class="navbar-item" :class="{active:nav.path===currentPath}" @click="togglePath(nav.path)">
                <i class="icon" :style="{backgroundImage:nav.path===currentPath?`url(${nav.activeIcon})`:`url(${nav.icon})`}" />
                <div class="navbar-item-title">{{nav.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { navbar } from "../utils/config";

export default {
  name: "NavBar",
  data: function() {
    let currentPath = this.$route.path;
    if (currentPath === "/") currentPath = "/home";
    return {
      navbar,
      currentPath
    };
  },
  methods: {
    togglePath: function(path) {
      if (path !== this.currentPath) {
        this.currentPath = path;
        this.$router.push({ path });
      }
    }
  },
  watch: {
    $route(to) {
      let { path } = to;
      if (path === "/") path = "/home";
      this.currentPath = path;
    }
  }
};
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  width: 100%;
  line-height: 1;
  box-shadow: 0 0 2px #ddd;
  color: #ddd;
  background: #fff;
}
.navbar-item {
  flex-grow: 1;
  padding: 6px 0;
  position: relative;
  &:not(:last-child):after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    width: 0.5px;
    height: 60%;
    background: #b8c2ca;
  }
  &.active {
    color: #ffa32f;
  }
}
.navbar-item-title {
  /*font-weight: bolder;*/
  padding-top: 4px;
}
</style>
