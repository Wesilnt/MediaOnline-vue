<template>
    <div>
        <router-view/>
        <div id="navbar" class="navbar">
            <div v-for="(nav) in navbar" :key="nav.path" class="navbar-item" :class="{active:nav.path===currentPath}"  @click="togglePath(nav.path)">
                <i :style="{backgroundImage:nav.path===currentPath?`url(${nav.activeIcon})`:`url(${nav.icon})`}" class="qhht-icon navbar-icon animated" :class="{bounceIn:nav.path===currentPath}"></i>
                <div class="navbar-item-title">{{nav.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { navbar } from '../utils/config'

export default {
  name: 'NavBar',
  data: function() {
    let currentPath = this.$route.path
    if (currentPath === '/') currentPath = '/home'
    return {
      navbar,
      currentPath
    }
  },
  watch: {
    $route(to) {
      let { path } = to
      if (path === '/') path = '/home'
      this.currentPath = path
    }
  },
  methods: {
    togglePath: function(path) {
      if (path !== this.currentPath) {
        this.currentPath = path
        this.$router.push({ path })
      }
    }
  }
}
</script>

<style scoped lang="less">
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
  padding: 10px 0;
  position: relative;
  transition: color 0.3s linear 0.3s;
  &:not(:last-child):after {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    width: 0.5px;
    height: 60%;
    background: #f1f1f1;
  }
  &.active {
    color: #ffa32f;
  }
}
.navbar-item-title {
  font-size: 20px;
  padding-top: 6px;
}
.navbar-icon {
  padding-top: 14px;
}
</style>
