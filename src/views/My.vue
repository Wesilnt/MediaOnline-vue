<template>
  <div class="my">
    my {{currentPath}}
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
  methods: {
    togglePath: function(path) {
      if (path !== this.currentPath) {
        console.log(path);
        this.currentPath = path;
        this.$router.push({ path });
      }
    }
  }
};
</script>
