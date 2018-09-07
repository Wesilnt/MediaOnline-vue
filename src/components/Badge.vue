<template>
    <span class="qhht-badge" :class="`qhht-badge-${status}`"><slot />{{badge.text}}</span>
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
    }
  },
  computed: {
    badge: function() {
      let text = '中'
      if (this.status === 'success') {
        text = '成功'
      } else if (this.status === 'warning') {
        text = '失败'
      }
      return {
        text
      }
    }
  }
}
</script>
<style scoped lang="less">
.qhht-badge {
  border-radius: 8px;
  padding: 2px 8px;
  color: #fff;
  &-success {
    color: #ffa32f;
    background: transparent;
  }
  &-warning {
    background: #ccc;
  }
  &-normal {
    background: #ffa32f;
  }
}
.succ {
}
</style>
