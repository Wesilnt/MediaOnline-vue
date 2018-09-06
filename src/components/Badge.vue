<template>
    <mt-badge :color="badge.color" :class="{succ:badge.succ}"><slot />{{badge.text}}</mt-badge>
</template>
<script>
export default {
  name: 'Badge',
  props: {
    status: {
      default: 'normal',
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'normal'].indexOf(value) !== -1
      }
    },
    succColor: {
      type: String,
      default: 'transparent'
    },
    warnColor: {
      type: String,
      default: '#CCC'
    },
    normalColor: {
      type: String,
      default: '#ffa32f'
    }
  },
  computed: {
    badge: function() {
      let text = '中'
      let color = this.normalColor
      let succ = false
      if (this.status === 'success') {
        text = '成功'
        color = this.succColor
        succ = true
      } else if (this.status === 'warning') {
        text = '失败'
        color = this.warnColor
      }
      return {
        text,
        color,
        succ
      }
    }
  }
}
</script>
<style scoped>
.succ {
  color: #ffa32f;
}
</style>
