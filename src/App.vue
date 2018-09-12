<template>
      <router-view/>
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
