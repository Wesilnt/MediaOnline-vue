<template>
  <div></div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('audioData')
export default {
  data() {
    return {}
  },
  props: [],
  computed: {},
  created() {},
  methods: {
    play() {
      this._at.play()
    },
    pause() {
      this._at.pause()
    }
  }
}
</script>
