<template>
    <van-popup v-model="isShow" position="bottom" >
        <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
        />
    </van-popup>
</template>

<script>
import default_left_icon from '../assets/images/audio_cmt_speak.png'
import default_right_icon from '../assets/images/audio_cmt_text.png'

export default {
  name: 'Picker',
  props: {
    columns: {
      default: []
    },
    isShow: {
      default: false
    }
  },
  data: function() {
    return {}
  },
  methods: {
    onConfirm(value, index) {
      this.$emit('toggle', value)
    },
    onCancel() {
      this.$emit('close', false)
    }
  }
}
</script>

<style lang="less">
.van-picker {
  height: 300px;
}
.van-hairline--top-bottom van-picker__toolbar {
    padding-bottom: 10px;
}
.van-picker__cancel {
    height: 20px;
    color:#ffa32f;
    border: 0.3px solid #ffa32f;
    border-radius: 5px;
    background-color: white;
}
.van-picker__confirm {
    color:#ffa32f;
    border-radius: 5px;
    margin-bottom: 20px;
}
</style>
