<template>
  <div id="app">
    <div>
      <div id="nav">
        <router-link to="/">Index</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/mock">Mock</router-link>
      </div>
      <router-view/>
    </div>

  </div>
</template>
<script>

export default {
  name: "App",
};
</script>
<style lang="scss">
@import "scss/common";
#app {
  text-align: center;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
