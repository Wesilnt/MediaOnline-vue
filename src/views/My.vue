<template>
  <div class="my">
    my {{currentPath}}
    <mt-button @click="$router.push('/my/son')">to son</mt-button>
    <div class="test-px2rem"></div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "my",
  components: {
    // NavBar
  },
  data: function() {
    return {
      currentPath: "/my"
    };
  },
  mounted() {
    console.log("loading");
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
<style scoped lang="less">
  .test-px2rem{
    width: 750px;
    background: #f0a;
    height: 200px;
  }
</style>