<template>
	<span>{{showNum}}</span>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    num: {
      type: Number,
      default: 0
    },
    diff: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      origin: 0,
      step: 0,
      animation: null
    }
  },
  computed: {
    showNum: function() {
      return this.animation ? this.origin.toFixed(2) : this.num
    }
  },
  watch: {
    diff(difference) {
      if (difference === 0) return
      this.origin = this.num - difference
      this.step = parseFloat((difference / (60 / 1000) / 400).toFixed(3))
      this.$nextTick(() => {
        this.handleCounter()
      })
    }
  },
  methods: {
    handleCounter() {
      return (this.animation = requestAnimationFrame(this.counter))
    },
    counter() {
      if (this.diff > 0 && this.origin >= this.num) {
        cancelAnimationFrame(this.animation)
        return (this.animation = null)
      }
      if (this.diff < 0 && this.origin <= this.num) {
        return (this.animation = null)
      }
      this.origin = this.origin + this.step
      this.handleCounter()
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animation)
    this.animation = null
  }
}
</script>
