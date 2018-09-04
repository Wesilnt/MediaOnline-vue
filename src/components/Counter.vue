<template>
    <div>
        <h2>{{info}}  {{reverseInfo}}</h2>
        <p>{{sheep}}只羊</p>
        <p>{{newNameOfOdevity}}</p>
        <mt-button color="warning" @click="add">+</mt-button>
        <mt-button color="info" :disabled="sheep===0" @click="decrement">-</mt-button>
    </div>

</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} = createNamespacedHelpers("counter");

export default {
  name: "Counter",
  data: function() {
    return { info: "睡不着来数羊" };
  },
  computed: {
    reverseInfo() {
      return this.info
        .split("")
        .reverse()
        .join("");
    },
    /*odevity(){
          return this.$store.getters.odevity
      },*/
    /* ...mapState({
          sheep:state=>state.sheep,
      })*/
    ...mapState(["sheep"]),
    ...mapGetters({
      newNameOfOdevity: "odevity"
    })
  },
  methods: {
    /*...mapMutations([
          'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
          'decrement'
      ]),*/
    ...mapActions({
      add: "increment",
      decrement: "decrement"
    })
  }
};
</script>

<style scoped>
</style>
