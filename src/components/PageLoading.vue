<template>
    <div class="page-loading">loading</div>
</template>

<script>
export default {
  name: "PageLoading",
  data: function() {
    console.log("loadingPage");
    return {
      loading: true
    };
  }
};
</script>

<style scoped>
.page-loading {
  padding-top: 30vh;
  text-align: center;
  height: 50vh;
  background: #f0a;
}
</style>
