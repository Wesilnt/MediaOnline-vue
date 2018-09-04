<template>
  <div>
    <!-- <mt-button type="primary" @click="$router.push('/about')">about</mt-button>
    <mt-button type="primary"  @click="$router.push('/')">Index</mt-button>
    <mt-button type="primary" @click="$router.push('/mock')">mock</mt-button> -->

      <!-- <router-view class="my-container"/> -->
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  data: function() {
    return {
      needBack: null
    };
  },
  methods: {}
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
