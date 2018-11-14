<template>
  <span>{{showNum}}</span>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    prev: {
      type: Number,
      default: 0
    },
    cur: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: 0,
      step: 0,
      animation: null
    }
  },
  computed: {
    showNum: function() {
      return this.animation ? this.count.toFixed(2) : this.cur
    }
  },
  mounted() {
    if (this.cur === this.prev) return
    this.count = this.prev
    this.step = parseFloat(
      ((this.cur - this.prev) / (60 / 1000) / 800).toFixed(2)
    )
    this.$nextTick(() => {
      this.animation = this.handleCounter()
    })
  },
  methods: {
    handleCounter() {
      return requestAnimationFrame(this.counter)
    },
    counter() {
      if (this.prev > this.cur && this.count <= this.cur) {
        cancelAnimationFrame(this.animation)
        return (this.animation = null)
      }
      if (this.prev < this.cur && this.count >= this.cur) {
        cancelAnimationFrame(this.animation)
        return (this.animation = null)
      }
      this.count = this.count + this.step
      this.handleCounter()
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animation)
    this.animation = null
  }
}
</script>
