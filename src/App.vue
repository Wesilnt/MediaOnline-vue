<template>
  <div>
    <!-- <mt-button type="primary" @click="$router.push('/about')">about</mt-button>
    <mt-button type="primary"  @click="$router.push('/')">Index</mt-button>
    <mt-button type="primary" @click="$router.push('/mock')">mock</mt-button> -->
      <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data: function() {
    return {
      needBack: null
    }
  },
  methods: {}
}
</script>
<style lang="scss">
@import 'publicUIConfig/common';
</style>
