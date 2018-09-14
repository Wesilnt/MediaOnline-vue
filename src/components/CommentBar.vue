<template>
    <div class="qhht-flex commentBar-wrapper" >
        <a class="qhht-icon commentBar-btn" :style="{backgroundImage:`url('${iconLeft}')`}"></a>
        <van-field class="commentBar-inputer" v-model="value" placeholder="请输入用户名" />
        <a class="qhht-icon commentBar-btn"></a>
    </div>
</template>

<script>
import default_left_icon from '../assets/audio_cmt_speak.png'
export default {
  name: 'CommentBar',
  props: {
    iconLeft: {
      default: default_left_icon
    },
    iconRight: {
      default: default_left_icon
    }
  },
  data: function() {
    return {
      value: ''
    }
  },
}
</script>

<style lang="less" scoped>
.commentBar-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}
.commentBar-btn {
    
}
</style>
