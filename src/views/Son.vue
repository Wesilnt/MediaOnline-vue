<template>
  <div class="Son">
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
      currentPath: "/my/son"
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
