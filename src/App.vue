<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" v-if="needBack" @click="goBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      Title
      <mu-menu slot="right">
        <mu-button flat>MENU</mu-button>
        <mu-list slot="content">
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title><router-link to="/about">About</router-link></mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title><router-link to="/">Index</router-link></mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title> <router-link to="/mock">Mock</router-link></mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
      <router-view class="container"/>
  </div>
</template>
<script>
export default {
  name: "App",
  data: function() {
    const { path } = this.$router.history.current;
    return {
      needBack: path !== "/home"
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  },
  watch: {
    $route(to) {
      const { path } = to;
      if (path === "/home") {
        this.needBack = false;
      } else {
        this.needBack = true;
      }
    }
  }
};
</script>
<style lang="scss">
@import "scss/common";
.container {
  padding: 20px;
}
a {
  font-weight: bold;
  color: #2c3e50;
  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
