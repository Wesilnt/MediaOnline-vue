<template>
    <div>
        <div>{{count}}</div>
        <button @click="increment">+</button>
        <button :disabled="count===0" @click="decrement">-</button>
    </div>

</template>

<script>
import store from "../store/store";
import { mapMutations } from 'vuex';
export default {
  name: "Counter",
  computed: {
    count() {
      return store.state.count;
    }
  },
  methods: {
      ...mapMutations([
          'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
          // `mapMutations` 也支持载荷：
          'decrement' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ]),
  }
};
</script>

<style scoped>
</style>
