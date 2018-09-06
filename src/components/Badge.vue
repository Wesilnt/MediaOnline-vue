<template>
    <mt-badge :color="badge.color" :class="{succ:badge.succ}"><slot>{{badge.text}}</slot></mt-badge>
</template>
<script>
export default {
  name: "Badge",
  props: {
    content: String,
    status: {
      default: "normal",
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["success", "warning", "normal"].indexOf(value) !== -1;
      }
    },
    succColor: {
      type: String,
      default: "transparent"
    },
    warnColor: {
      type: String,
      default: "#CCC"
    },
    normalColor: {
      type: String,
      default: "#ffa32f"
    },
    text: {
      type: String,
      default: "拼团"
    }
  },

  computed: {
    badge: function() {
      let text = `${this.text}中`;
      let color = this.normalColor;
      let succ = false;
      if (this.status === "success") {
        text = `${this.text}成功`;
        color = this.succColor;
        succ = true;
      } else if (this.status === "warning") {
        text = `${this.text}失败`;
        color = this.warnColor;
      }
      return {
        text,
        color,
        succ
      };
    }
  }
};
</script>
<style scoped>
.succ {
  color: #ffa32f;
}
</style>
