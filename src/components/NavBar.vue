<template>
    <div>
        <router-view/>
        <ul class="navbar">
            <li v-for="(nav) in navbar" :key="nav.path" class="navbar-item" :class="{active:nav.path===currentPath}" @click="togglePath(nav.path)">
                <i class="icon"></i>
                <div class="navbar-item-title">{{nav.name}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "NavBar",
  data: function() {
    let currentPath = this.$router.history.current.fullPath;
    if (currentPath === "/app") currentPath = "/app/home";
    return {
      navbar: [
        {
          name: "首页",
          icon: "",
          path: "/app/home"
        },
        {
          name: "我的",
          icon: "",
          path: "/app/my"
        }
      ],
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
  list-style: none;
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
    color: #1edc58;
  }
}
.navbar-item-title {
  /*font-weight: bolder;*/
  padding-top: 4px;
}
</style>
