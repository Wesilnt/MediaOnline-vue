<template>
  <div class="about">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Counter />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Counter from "@/components/Counter";
export default {
  name: "about",
  components: {
    HelloWorld,
    Counter
  }
};
</script>
