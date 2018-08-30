<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" v-if="needBack" @click="goBack">
        <mu-icon value="arrow_back" />
      </mu-button>
      <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      Title
      <mu-menu slot="right">
        <mu-button flat>MENU</mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="$router.push('/about')">
            <mu-list-item-content>
              <mu-list-item-title>About</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="$router.push('/')">
            <mu-list-item-content>
              <mu-list-item-title>Index</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="$router.push('/mock')">
            <mu-list-item-content>
              <mu-list-item-title>Mock</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
      <router-view class="my-container"/>
  </div>
</template>
<script>
export default {
  name: "App",
  data: function() {
    const { path } = this.$route;
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
.my-container {
  padding: 20px 20px 82px;
}
a {
  font-weight: bold;
  color: #2c3e50;
  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
